namespace Lightspeed {
    export class ElementInitContext {
        private _canvasWidth: number;
        private _canvasHeight: number;

        constructor(canvas :Canvas) {
            this._canvasHeight = canvas.height;
            this._canvasWidth = canvas.width;
        }

        public get canvasWidth() {
            return this._canvasWidth;
        }

        public get canvasHeight () {
            return this._canvasHeight;
        }
    }
}