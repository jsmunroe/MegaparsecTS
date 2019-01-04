namespace Lightspeed {
    export class Canvas {
        private _htmlCanvas : HTMLCanvasElement;

        private _scaleHeight : number;
        private _scaleWidth : number;
        private _scaleFactor : number = 1;

        constructor(canvas :HTMLCanvasElement){
            this._htmlCanvas = canvas;
        }

        get width() : number {
            return this._scaleWidth || this._htmlCanvas.scrollWidth / this._scaleFactor;
        }

        get height() : number {
            return this._scaleHeight || this._htmlCanvas.scrollHeight / this._scaleFactor;
        }

        get box() : Box {
            return new Box(0, 0, this.width, this.height);
        }

        startRender() : CanvasRenderingContext2D {
            var ctx = this._htmlCanvas.getContext('2d');
            ctx.save();

            ctx.scale(this._scaleFactor, this._scaleFactor);

            return ctx;
        }

        endRender(ctx) :void {
            ctx.restore();
        }

        public scaleWidth(width: number) {
            this._scaleHeight = null;
            this._scaleWidth = width;

            this._scaleFactor = this._htmlCanvas.scrollWidth / width;

            this._htmlCanvas.width = this._htmlCanvas.scrollWidth;
            this._htmlCanvas.height = this._htmlCanvas.scrollHeight;
        }

        public scaleHeight(height: number) {
            this._scaleHeight = height;
            this._scaleWidth = null;

            this._scaleFactor = this._htmlCanvas.scrollHeight / height;

            this._htmlCanvas.width = this._htmlCanvas.scrollWidth;
            this._htmlCanvas.height = this._htmlCanvas.scrollHeight;
        }

        public static find() :Canvas {
            var htmlCanvas : HTMLCanvasElement = document.querySelector('canvas');

            var canvas = new Canvas(htmlCanvas);

            var scaleHeight = +htmlCanvas.getAttribute('scale-height');
            if (scaleHeight) {
                canvas.scaleHeight(scaleHeight);
            }

            var scaleWidth = +htmlCanvas.getAttribute('scale-width');
            if (scaleWidth) {
                canvas.scaleWidth(scaleWidth);
            }

            return canvas;
        }
    }
}