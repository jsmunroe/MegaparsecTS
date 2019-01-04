namespace Lightspeed {
    export class FrameUpdateContext {
        private _engine : Engine;
        
        private _canvasBox: Box;

        private _timeStamp : number;
        private _elapsed: number;
        private _delta: number;

        private static _lastTimeStamp : number;

        constructor(engine : Engine, timeStamp : DOMHighResTimeStamp) {
            this._engine = engine;

            this._canvasBox = engine.canvas.box;

            this._timeStamp = timeStamp;
            
            if (!FrameUpdateContext._lastTimeStamp) {
                FrameUpdateContext._lastTimeStamp = timeStamp;
            }

            this._elapsed = timeStamp - FrameUpdateContext._lastTimeStamp;
            this._delta = this._elapsed / 1000;

            FrameUpdateContext._lastTimeStamp = timeStamp;
        }

        public get elapsed() {
            return this._elapsed;
        }

        public get delta() {
            return this._delta;
        }

        public get canvasBox() :Box {
            return this._canvasBox;
        }
    }
}
