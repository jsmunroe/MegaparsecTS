namespace Lightspeed {
    export class Box {
        private _left: number = 0;
        private _top: number = 0;

        private _width: number;
        private _height: number;

        constructor(left: number, top: number, width: number, height: number) {
            this._left = left;
            this._top = top;
            this._width = width;
            this._height = height;
        }

        public get left() {
            return this._left;
        }

        public get top() {
            return this._top;
        }

        public get width() {
            return this._width;
        }

        public get height() {
            return this._height;
        }

        public get right() {
            return this._left + this._width;
        }

        public get bottom() {
            return this._top + this._height;
        }

        public get center() :Vector {
            return new Vector(this.left + this._width / 2, this.top + this.height / 2);
        }

        public inflate(cx: number, cy: number) :Box {
            return new Box(this.left - cx/2, this.top - cy/2, this.width + cx, this.height + cy);
        }

        public alignLeft(left: number) :Box  {
            return new Box(left, this.top, this.width, this.height);
        }

        public alignTop(top: number) :Box  {
            return new Box(this.left, top, this.width, this.height);
        }

        public alignRight(right: number) :Box  {
            return new Box(right - this.width, this.top, this.width, this.height);
        }

        public alignBottom(bottom: number) :Box  {
            return new Box(this.left, bottom - this.height, this.width, this.height);
        }

        public offsetV(vector: Vector) :Box {
            return this.offset(vector.x, vector.y);
        }
        
        public offset(cx?: number, cy?: number) :Box  {
            return new Box(this.left + cx, this.top + cy, this.width, this.height);
        }

        public collides(other: Box) :boolean {
            return (this.left < other.right && this.right > other.left && this.top < other.bottom && this.bottom > other.top);
        }
        
        public contains(other: Box) :boolean {
            return (this.left <= other.left && this.right >= other.right && this.top <= other.top && this.bottom >= other.bottom);
        }

        public static fromCenter(center: Vector, width: number, height: number) {
            return new Box(center.x - width/2, center.y - height/2, width, height);
        }
    }
}