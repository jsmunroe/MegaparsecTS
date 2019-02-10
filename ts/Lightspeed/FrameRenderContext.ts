namespace Lightspeed {
    export class FrameRenderContext {
        private _engine : Engine;
        private _ctx: CanvasRenderingContext2D;
        private _timeStamp: DOMHighResTimeStamp;

        constructor(engine : Engine, timeStamp : DOMHighResTimeStamp, ctx: CanvasRenderingContext2D) {
            this._engine = engine;
            this._ctx = ctx;
            this._timeStamp = timeStamp;
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

        public getFrame(frameLength: number, frameCount: number) {
            return Math.floor(this._timeStamp / frameLength) % frameCount;
        }
    }
}