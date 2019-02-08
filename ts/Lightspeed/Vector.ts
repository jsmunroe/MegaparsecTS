namespace Lightspeed {
    export class Vector {
        private readonly _x: number;
        private readonly _y: number;

        constructor(x?: number, y?: number) {
            this._x = x || 0;
            this._y = y || 0;
        }

        public get x() :number {
            return this._x;
        }

        public get y() :number {
            return this._y;
        }

        public get magnitude() :number {
            return Math.sqrt(this.x*this.x + this.y*this.y);
        }

        public get argument() :number {
            return Math.atan2(this.y, this.x);
        }

        public get normal() :Vector {
            return this.scale(1 / this.magnitude);
        } 
               
        public add(other: Vector) :Vector {
            return new Vector(this.x + other.x, this.y + other.y);
        }

        public scale(scalar: number) :Vector {
            return new Vector(this.x * scalar, this.y * scalar);
        }

        public dot(other: Vector) :number {
            return this.x * other.x + this.y * other.y;
        }

        public with(changeX: (x: number) => number, changeY: (y: number) => number) :Vector {
            return new Vector(changeX(this.x), changeY(this.y));
        }

        public withX(change: (x: number) => number) :Vector {
            return new Vector(change(this.x), this.y);
        }

        public withY(change: (y: number) => number) :Vector {
            return new Vector(this.x, change(this.y));
        }

        public angleTo(other: Vector) :number {
            return Math.atan2(other.y - this.y, other.x - this.x);
        }

        public distanceTo(other: Vector) :number {
            return Math.sqrt(Math.pow(other.x - this.x, 2) + Math.pow(other.y - this.y, 2));
        }

        public static fromPolar(argument: number, magnitude: number) {
            return new Vector(
                Math.cos(argument) * magnitude,
                Math.sin(argument) * magnitude,
            );
        }

    }
}