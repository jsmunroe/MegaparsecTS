namespace Lightspeed {
    export class FrameUpdateContext {
        private _engine : Engine;
        
        private _canvasBox: Box;

        private _timeStamp: DOMHighResTimeStamp;

        private _elapsed: number;
        private _delta: number;

        private static _lastTimeStamp : number;

        public currentElement : Element;

        constructor(engine : Engine, timeStamp : DOMHighResTimeStamp, fromPause? : boolean) {
            this._engine = engine;

            this._canvasBox = engine.canvas.box;
            
            if (!FrameUpdateContext._lastTimeStamp) {
                FrameUpdateContext._lastTimeStamp = timeStamp;
            }

            this._timeStamp = timeStamp;

            this._elapsed = timeStamp - FrameUpdateContext._lastTimeStamp;
            this._delta = this._elapsed / 1000;

            if (fromPause) {
                this._elapsed = 0;
                this._delta = 0;
            }

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

        public activate(element: Element): void {
            this._engine.pushElement(element);
        }

        public delay(elapsed: number, action: (context: FrameUpdateContext) => void): void {
            this._engine.requestTimeout(this._timeStamp + elapsed, this.currentElement, action);
        }
    }
}
