namespace Lightspeed {
    export class ElementInitContext {
        private _canvasBox: Box;
        private _engine: Engine;

        constructor(engine: Engine, canvas :Canvas) {
            this._engine = engine;
            this._canvasBox = canvas.box;
        }

        public get engine(): Engine {
            return this._engine;
        }

        public get canvasBox() {
            return this._canvasBox;
        }

        public activate(element: Element): void {
            this._engine.pushElement(element);
        }

        public delay(time: number, element: Element, action: (context: FrameUpdateContext) => void): void {
            this._engine.requestTimeout(time, element, action);
        }
    }
}