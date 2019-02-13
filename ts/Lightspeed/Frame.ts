namespace Lightspeed {
    export class Segment {
        private _engine: Engine;
        private _name: string;

        private _isPaused: boolean = false;
        private _wasPaused: boolean = false;

        private _elements : Element[] = [];
        private _elementTimeouts: ElementTimeout[] = [];

        get isPaused() :boolean {
            return this._isPaused;
        }

        get wasPaused() :boolean {
            return this._wasPaused;
        }

        get name() {
            return this._name;
        }

        constructor(engine: Engine, name: string) {
            this._engine = engine;
            this._name = name;
        }

        clear() {
            this._elements = [];
        }

        pushElement(element: Element) {
            this._elements.push(element);

            var initContext = new ElementInitContext(this._engine, this._engine.canvas);
            element.init(initContext);

            this._elements.sort((a, b) => a.zIndex - b.zIndex);
        }

        removeElement(element: Element) {
            var index = this._elements.indexOf(element);

            if (index !== -1) {
                this._elements.splice(index, 1);
            }
        }

        findElements(predicate?: (element: Element) => boolean) :Element[] {
            if (!predicate) {
                return this._elements;
            }

            return this._elements.filter(predicate);
        }

        findFirstElement(predicate?: (element: Element) => boolean) :Element {
            return this.findElements(predicate)[0];
        }

        findClosestElement(position: Vector, predicate?: (element: Element) => boolean) :Element {
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

        pause() {
            this._isPaused = true;
            this._wasPaused = true;
        }

        unpause() {
            this._isPaused = false;
        }

        togglePause() {
            if (this._isPaused) {
                this.unpause();
            } else {
                this.pause();
            }
        }

        requestTimeout(delay: number, element: Element, action: (context: FrameUpdateContext) => void) {
            this._elementTimeouts.push({
                delay: delay,
                elapsed: 0,
                element: element,
                action: action
            });
        }

        update(context: FrameUpdateContext) {
            // Get element timeouts for this frame.
            var currentElementTimeouts = this.getCurrentElementTimeouts(context);

            for (let i = 0; i < currentElementTimeouts.filter(p => p.element == null).length; i++) {
                const elementTimeout = currentElementTimeouts[i];
                elementTimeout.action.bind(this)(context);
            }

            // Remove dead elements.
            this._elements = this._elements.filter(p => !p.isDead)

            this.checkCollisions();

            for (let i = 0; i < this._elements.length; i++) {
                const element = this._elements[i];
                
                context.currentElement = element;

                element.update(context);

                var elementTimeouts = currentElementTimeouts.filter(i => i.element === element);
                for (let j = 0; j < elementTimeouts.length; j++) {
                    const elementTimeout = elementTimeouts[j];
                    elementTimeout.action.bind(elementTimeout.element)(context);
                }
            }
        }

        render(context: FrameRenderContext) {
            var ctx = context.ctx;

            for (let i = 0; i < this._elements.length; i++) {
                const element = this._elements[i];

                ctx.save();
                
                element.render(context);

                ctx.restore();
            }
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
                        first.onCollide(new ElementCollisionContext(this._engine, second));
                        second.onCollide(new ElementCollisionContext(this._engine, first));
                    }
                }
            }
    
            return collisions;
        }
        
    }

    class ElementTimeout {
        public delay: number;
        public elapsed :number;
        public element :Element;
        public action :(context: FrameUpdateContext) => void;
    }
}