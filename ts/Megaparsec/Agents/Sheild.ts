namespace Megaparsec {
    export abstract class Sheild {
        private _color: string = 'green';

        constructor(color: string) {
            this._color = color;
        }

        collide(context: Lightspeed.ElementCollisionContext) {
            return true; // true indicates sheild has failed.
        }

        update(context: Lightspeed.FrameUpdateContext) {
            // optionally overloaded by subclasses.
        }

        abstract isActive(): boolean;

        abstract getSheildRatio(): number;

        draw(ctx: CanvasRenderingContext2D, position: Vector, width: number, height: number) {
            if (this.isActive()) {
                ctx.save();

                ctx.globalAlpha = this.getSheildRatio();
                ctx.lineWidth = 2.0;
                ctx.strokeStyle = this._color;
                ctx.fillStyle = this._color;
                ctx.beginPath();
                ctx.ellipse(position.x, position.y, width * 0.8, height * 0.8, 0, 0, Math.PI * 2);
                ctx.stroke();
                ctx.globalAlpha = 0.1;
                ctx.fill();

                ctx.restore();
            }
        }
    }

    export class EnergySheild extends Sheild {
        private _strength: number;

        constructor(strength: number, color?: string) {
            super(color || 'blue');

            this._strength = strength;
        }

        collide(context: Lightspeed.ElementCollisionContext): boolean {
            this._strength--; 

            return this._strength < 0;
        }

        isActive(): boolean {
            return this._strength > 0;
        }

        getSheildRatio(): number {
            return Math.min(1, this._strength / 5);
        }

    }

    export class TimeSheild extends Sheild {
        private _time: number; 
        private _elapsed: number = 0;

        constructor(time: number, color?: string) {
            super(color || 'red');

            this._time = time;
        }

        update(context: Lightspeed.FrameUpdateContext) {
            this._elapsed = this._elapsed + context.elapsed;
        }

        collide(context: Lightspeed.ElementCollisionContext): boolean {
            return this._elapsed >= this._time;
        }
        
        isActive(): boolean {
            return this._elapsed < this._time;
        }

        getSheildRatio(): number {
            return Math.min(1, (this._time - this._elapsed) / this._time);
        }


    }
}