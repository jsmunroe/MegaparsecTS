namespace Megaparsec {
    export class Explosion extends Lightspeed.InertialElement {
        private _particleCount: number = 100;
        private _durration: number = 750; // milliseconds
        private _particleMaxMagnitude = 100; 

        private _particles: any[] = [];

        private _totalElapsed: number = 0;

        private _alpha: number = 1;

        constructor(origin: Lightspeed.InertialElement, velocity?: Vector) {
            super();

            this.position = origin.position;
            this.velocity = velocity || origin.velocity;
        }

        init(context: Lightspeed.ElementInitContext) : void {
            for (var i = 0; i < this._particleCount; i++) {
                var argument = Random.Current.next(Math.PI * 2);
                var magnitude = Random.Current.next(this._particleMaxMagnitude);

                this._particles.push({
                    position: new Lightspeed.Vector(0, 0),
                    velocity: Lightspeed.Vector.fromPolar(argument, magnitude),
                    color: Color.getRandomColor(),
                    radius: Random.Current.next(2)
                });
            }
        }

        update(context: Lightspeed.FrameUpdateContext): void {
            this._totalElapsed += context.elapsed;
            
            if (this._totalElapsed >= this._durration) {
                this.kill();
                return;
            }

            this._alpha = 1 - this._totalElapsed / this._durration;

            this._particles.forEach(i => {
                i.position = i.position.add(i.velocity.scale(context.delta));
            });

            super.update(context);
        }

        render(context: Lightspeed.FrameRenderContext): void {
            var ctx = context.ctx;

            ctx.globalAlpha = this._alpha;
                
            this._particles.forEach(i => {
                var position = i.position.add(this.position);

                ctx.fillStyle = i.color;
                ctx.beginPath();
                ctx.arc(position.x, position.y, i.radius, 0, 2 * Math.PI);
                ctx.fill();
            });
        }
    }
}