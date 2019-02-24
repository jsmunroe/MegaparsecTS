namespace Lightspeed {
    export class Size {
        private _width: number;
        private _height: number;

        get width() {
            return this._width;
        }

        get height() {
            return this._height;
        }

        constructor(width: number, height: number) {
            this._width = width;
            this._height = height;
        }    

        scale(scaler: number) :Size
        scale(scalarX: number, scalarY?: number) :Size {
            return new Size(this._width * scalarX, this._height * (scalarY || scalarX));
        }

        withWidth(change: (width: number) => number) : Size {
            return new Size(change(this.width), this.height);
        }

        withHeight(change: (height: number) => number) : Size {
            return new Size(this.width, change(this.height));
        }

    }
}