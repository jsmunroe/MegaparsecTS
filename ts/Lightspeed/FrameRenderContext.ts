namespace Lightspeed {
    export class FrameRenderContext {
        private _engine : Engine;
        private _ctx: CanvasRenderingContext2D;

        constructor(engine : Engine, ctx: CanvasRenderingContext2D) {
            this._engine = engine;
            this._ctx = ctx;
        }

        public get canvasWidth() {
            return this._engine.canvas.width;
        }

        public get canvasHeight () {
            return this._engine.canvas.height;
        }

        public get ctx() {
            return this._ctx;
        }
    }
}