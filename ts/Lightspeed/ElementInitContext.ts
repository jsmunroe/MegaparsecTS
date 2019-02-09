namespace Lightspeed {
    export class ElementInitContext {
        private _canvasBox: Box;
        private _engine: Engine;

        public get engine(): Engine {
            return this._engine;
        }

        constructor(engine: Engine, canvas :Canvas) {
            this._engine = engine;
            this._canvasBox = canvas.box;
        }

        public get canvasBox() {
            return this._canvasBox;
        }
    }
}