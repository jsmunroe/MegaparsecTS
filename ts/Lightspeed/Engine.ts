namespace Lightspeed {
    export class Engine {
        private _canvas : Canvas;

        private _elements : Element[] = [];

        private _isPaused : boolean = false;
        private _wasPaused : boolean = false;

        private _elementTimeouts: ElementTimeout[] = [];

        constructor() {
            this._canvas = Canvas.find();
        }

        public clear() {
            this._elements = [];
        }

        public pushElement(element: Element) {
            this._elements.push(element);

            var initContext = new ElementInitContext(this.canvas);
            element.init(initContext);
        }

        public removeElement(element: Element) {
            var index = this._elements.indexOf(element);

            if (index !== -1) {
                this._elements.splice(index, 1);
            }
        }

        public get canvas() {
            return this._canvas;
        }

        public get isPaused() {
            return this._isPaused;
        }

        public pause() {
            this._isPaused = true;
            this._wasPaused = true;
        }

        public unpause() {
            this._isPaused = false;
        }

        public togglePause() {
            if (this._isPaused) {
                this.unpause();
            } else {
                this.pause();
            }
        }

        public requestTimeout(time: number, element: Element, action: (context: FrameUpdateContext) => void) {
            this._elementTimeouts.push({
                time: time,
                element: element,
                action: action
            });
        }

        private runFrame(timeStamp : DOMHighResTimeStamp) {
            requestAnimationFrame(this.runFrame.bind(this));

            // Get element timeouts for this frame.
            var currentElementTimeouts = this._elementTimeouts.filter(i => i.time <= timeStamp && !i.element.isDead)
            this._elementTimeouts = this._elementTimeouts.filter(i => i.time > timeStamp && !i.element.isDead);

            if (!this._isPaused) {
                // Update phase
                var updateContext = new FrameUpdateContext(this, timeStamp, this._wasPaused);

                this._wasPaused = false;

                // Remove dead elements.
                this._elements = this._elements.filter(p => !p.isDead)

                this.checkCollisions();

                for (let i = 0; i < this._elements.length; i++) {
                    const element = this._elements[i];
                    
                    updateContext.currentElement = element;

                    element.update(updateContext);

                    var elementTimeouts = currentElementTimeouts.filter(i => i.element === element);
                    for (let j = 0; j < elementTimeouts.length; j++) {
                        elementTimeouts[j].action.bind(elementTimeouts[j].element)(updateContext);
                    }
                }
            }

            // Render phase
            var ctx = this.canvas.startRender();
            var renderContext = new FrameRenderContext(this, ctx);

            for (let i = 0; i < this._elements.length; i++) {
                const element = this._elements[i];

                ctx.save();
                
                element.render(renderContext);

                ctx.restore();
            }

            this.canvas.endRender(ctx);
        }

        private checkCollisions() {
            var collisions = [];
                for (var i = 0; i < this._elements.length; i++) {
                for (var j = i + 1; j < this._elements.length; j++) {
                    var first = this._elements[i];
                    var second = this._elements[j];
    
                    if (first.collidesWith(second)) {
                        first.collide(new ElementCollisionContext(this, second));
                        second.collide(new ElementCollisionContext(this, first));
                    }
                }
            }
    
            return collisions;
        }

        public run() {
            requestAnimationFrame(this.runFrame.bind(this));
        }
    }

    class ElementTimeout {
        public time :number;
        public element :Element;
        public action :(context: FrameUpdateContext) => void;
    }
}
