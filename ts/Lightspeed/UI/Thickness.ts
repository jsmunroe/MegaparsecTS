namespace Lightspeed.UI {
    export class Thickness {
        left: number;
        top: number;
        right: number;
        bottom: number;

        get half() :Thickness {
            return new Thickness(this.left * 0.5, this.top * 0.5, this.right * 0.5, this.bottom * 0.5);
        }

        constructor(left: number, top: number, right: number, bottom: number) {
            this.left = left;
            this.top = top;
            this.right = right;
            this.bottom = bottom;
        }

        static all(thickness: number) :Thickness {
            return new Thickness(thickness, thickness, thickness, thickness);
        }

        static dimensions(horizontal: number, vertical: number) {
            return new Thickness(horizontal, vertical, horizontal, vertical);
        }
    }
}