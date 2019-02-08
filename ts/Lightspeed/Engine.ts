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

        public findElements(predicate?: (element: Element) => boolean) {
            if (!predicate) {
                return this._elements;
            }

            return this._elements.filter(predicate);
        }

        public findFirstElement(predicate?: (element: Element) => boolean) {
            return this.findElements(predicate)[0];
        }

        public findClosestElement(position: Vector, predicate?: (element: Element) => boolean) {
            var elements: InertialElement[] = this.findElements(predicate).filter(i => i instanceof InertialElement).map(i => <InertialElement>i);

            if (!elements.length) {
                return null;
            }

            var closestElement = elements[0];
            var closestDistance = closestElement.position.distanceTo(position);
            for (let i = 0; i < elements.length; i++) {
                const element = elements[i];
                
                var distance = element.position.distanceTo(position);
                if (distance < closestDistance) {
                    closestElement = element;
                    closestDistance = distance;
                }
            }

            return closestElement;
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

        public requestTimeout(delay: number, element: Element, action: (context: FrameUpdateContext) => void) {
            this._elementTimeouts.push({
                delay: delay,
                elapsed: 0,
                element: element,
                action: action
            });
        }

        private runFrame(timeStamp : DOMHighResTimeStamp) {
            requestAnimationFrame(this.runFrame.bind(this));

            if (!this._isPaused) {
                // Update phase
                var updateContext = new FrameUpdateContext(this, timeStamp, this._wasPaused);

                this._wasPaused = false;

                // Get element timeouts for this frame.
                var currentElementTimeouts = this.getCurrentElementTimeouts(updateContext);

                // Remove dead elements.
                this._elements = this._elements.filter(p => !p.isDead)

                this.checkCollisions();

                for (let i = 0; i < this._elements.length; i++) {
                    const element = this._elements[i];
                    
                    updateContext.currentElement = element;

                    element.update(updateContext);

                    var elementTimeouts = currentElementTimeouts.filter(i => i.element === element);
                    for (let j = 0; j < elementTimeouts.length; j++) {
                        const elementTimeout = elementTimeouts[j];
                        elementTimeout.elapsed += updateContext.elapsed;
                        elementTimeout.action.bind(elementTimeouts[j].element)(updateContext);
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

        // Get the element timeouts for the current frame.
        private getCurrentElementTimeouts(updateContext: FrameUpdateContext) {
            var currentElementTimeouts = [];
            var nextElementTimeouts = [];

            for (let i = 0; i < this._elementTimeouts.length; i++) {
                const elementTimeout = this._elementTimeouts[i];

                elementTimeout.elapsed += updateContext.elapsed;
                if (elementTimeout.elapsed >= elementTimeout.delay) {
                    currentElementTimeouts.push(elementTimeout);
                } else {
                    nextElementTimeouts.push(elementTimeout);
                }
            }

            this._elementTimeouts = nextElementTimeouts;

            return currentElementTimeouts;
        }

        private checkCollisions() {
            var collisions = [];
                for (var i = 0; i < this._elements.length; i++) {
                for (var j = i + 1; j < this._elements.length; j++) {
                    var first = this._elements[i];
                    var second = this._elements[j];
    
                    if (first.collidesWith(second)) {
                        first.onCollide(new ElementCollisionContext(this, second));
                        second.onCollide(new ElementCollisionContext(this, first));
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
        public delay: number;
        public elapsed :number;
        public element :Element;
        public action :(context: FrameUpdateContext) => void;
    }
}
