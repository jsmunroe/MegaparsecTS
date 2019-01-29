namespace Lightspeed {
    export class Sprite {
        private _isLoaded: boolean = false;

        private _onLoadCallbacks: ((sprit: Sprite) => void)[] = [];
        
        private _image: HTMLImageElement;

        private _width: number;
        private _height: number;

        public opacity: number = 1;
        
        public get width() :number {
            return this._width;
        }

        public get height() :number {
            return this._height;
        }

        constructor(imagePath: string, width?: number, height?: number) {
            this._image = new Image();
            this._image.src = imagePath;

            var scale = width;

            if (width && height) {
                this._width = width;
                this._height = height;

                this._isLoaded = true;
            } else if (scale) {
                this._image.onload = () => {
                    this._width = this._image.width * scale;
                    this._height = this._image.height * scale;

                    this._isLoaded = true;
                    this._onLoadCallbacks.forEach(i => i(this));
                    this._onLoadCallbacks = [];
                };
            }
        }

        registerLoadCallback(callback: (sprite: Sprite) => void) {
            if (this._isLoaded) {
                callback(this);
                return;
            }

            this._onLoadCallbacks.push(callback);
        }

        draw(ctx: CanvasRenderingContext2D, position: Vector) {
            if (!this._isLoaded) {
                return;
            }

            ctx.save();

            ctx.globalAlpha = this.opacity;
            ctx.drawImage(this._image, position.x - this.width / 2, position.y - this.height / 2, this.width, this.height);

            ctx.restore();
        }
    }
}