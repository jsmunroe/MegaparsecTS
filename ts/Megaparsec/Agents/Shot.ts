namespace Megaparsec {
    export class Shot extends GameObject {
        private _origin: GameObject;

        private _color: string;

        private _passesThroughOnHit: boolean = false;

        constructor(origin: GameObject, velocity: Lightspeed.Vector, acceleration?: Lightspeed.Vector) {
            super(20, 5, Constrainer.killOutOfBounds);

            this._origin = origin;

            this._color = 'CornFlowerBlue';

            this.position = origin.position;
            this.velocity = velocity;
            acceleration && (this.acceleration = acceleration);
        }

        update(context: Lightspeed.FrameUpdateContext): void {
            if (!context.canvasBox.collides(this.box)) {
                this.kill();
            }

            super.update(context);
        }

        render(context: Lightspeed.FrameRenderContext): void {
            var ctx = context.ctx;

            var box = this.box;

            ctx.fillStyle = this._color;
            ctx.fillRect(box.left, box.top, box.width, box.height);
        }

        collide(context: Lightspeed.ElementCollisionContext): void {
            if (context.otherElement instanceof Agent && context.otherElement != this._origin) {            
                var agent :Agent = context.otherElement as Agent
                agent.explode(context);

                if (!this._passesThroughOnHit) {
                    this.kill();
                }
            }
        }
    }
}