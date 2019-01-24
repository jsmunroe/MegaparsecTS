namespace Lightspeed {
    export class ElementInitContext {
        private _canvasBox: Box;

        constructor(canvas :Canvas) {
            this._canvasBox = canvas.box;
        }

        public get canvasBox() {
            return this._canvasBox;
        }
    }
}