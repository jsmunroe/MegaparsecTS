namespace Megaparsec {
    export abstract class Sheild {
        collide(context: Lightspeed.ElementCollisionContext) {
            return true; // true indicates sheild has failed.
        }

        update(context: Lightspeed.FrameUpdateContext) {
            // optionally overloaded by subclasses.
        }

        draw(ctx: CanvasRenderingContext2D, position: Vector, width: number, height: number) {
            ctx.save();

            ctx.lineWidth = 2.0;
            ctx.strokeStyle = 'green';
            ctx.beginPath();
            ctx.ellipse(position.x, position.y, width * 0.75, height * 0.75, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();

            ctx.restore();
        }
    }

    export class EnergySheild extends Sheild {
        private _strength: number;

        constructor(strength) {
            super();

            this._strength = strength;
        }

        collide(context: Lightspeed.ElementCollisionContext): boolean {
            this._strength--; 

            return this._strength < 0;
        }

        draw(ctx: CanvasRenderingContext2D, position: Vector, width: number, height: number) {
            ctx.save();

            if (this._strength > 0) {
                ctx.globalAlpha = this._strength / 5;
                ctx.lineWidth = 2.0;
                ctx.strokeStyle = 'blue';
                ctx.fillStyle = 'blue';
                ctx.beginPath();
                ctx.ellipse(position.x, position.y, width * 0.8, height * 0.8, 0, 0, Math.PI * 2);
                ctx.stroke();
                ctx.globalAlpha = 0.1;
                ctx.fill();
            }

            ctx.restore();
        }
    }

    export class TimeSheild extends Sheild {
        private _time: number; 
        private _elapsed: number = 0;

        constructor(time) {
            super();

            this._time = time;
        }

        update(context: Lightspeed.FrameUpdateContext) {
            this._elapsed = Math.min(this._elapsed + context.elapsed, this._time);
        }

        collide(context: Lightspeed.ElementCollisionContext): boolean {
            return this._elapsed >= this._time;
        }

        draw(ctx: CanvasRenderingContext2D, position: Vector, width: number, height: number) {
            ctx.save();

            ctx.globalAlpha = (this._time - this._elapsed) / this._time;
            ctx.lineWidth = 2.0;
            ctx.strokeStyle = 'red';
            ctx.fillStyle = 'red';
            ctx.beginPath();
            ctx.ellipse(position.x, position.y, width * 0.8, height * 0.8, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.globalAlpha = 0.1;
            ctx.fill();

            ctx.restore();
        }
    }
}