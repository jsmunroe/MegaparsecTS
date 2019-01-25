namespace Lightspeed {
    export class ElementCollisionContext {
        _engine: Engine;
        _otherElement: Element;

        public get otherElement() {
            return this._otherElement;
        }

        constructor(engine : Engine, otherElement :Element) {
            this._engine = engine;
            this._otherElement = otherElement;
        }

        public pushElement(element: Element) {
            this._engine.pushElement(element);
        }


    }
}