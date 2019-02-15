namespace Lightspeed.UI {
    export class Thickness {
        left: number;
        top: number;
        right: number;
        bottom: number;

        constructor(all: number)
        constructor(vertical: number, horizontal?: number)
        constructor(left: number, top?: number, right?: number, bottom?: number) {
            if (right && bottom) {
                this.left = left;
                this.top = top;
                this.right = right;
                this.bottom = bottom;
            } else if (top) {
                this.left = left;
                this.top = top;
                this.right = left;
                this.bottom = top;
            } else {
                this.left = left;
                this.top = left;
                this.right = left;
                this.bottom = left;
            }
        }

        reduce(box: Box) {
            return new Box(
                box.left + this.left,
                box.top + this.top,
                box.width - (this.left + this.right),
                box.height - (this.top + this.bottom)
            );
        }

        increase(box: Box) {
            return new Box( 
                box.left - this.left,
                box.top - this.top,
                box.width + (this.left + this.right),
                box.height + (this.top + this.bottom)
            );
        }
    }
}