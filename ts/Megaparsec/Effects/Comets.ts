namespace Megaparsec {
    export class Comets extends BackgroundAnimation {
        private _comets: Comet[] = [];

        constructor() {
            super();
            
            this.zIndex = -900;
        }

        update(context: Lightspeed.FrameUpdateContext): void {
            if (Random.Current.nextInt(100) === 0) {
                this.addRandomComet(context.canvasBox)
            }

            for (let i = 0; i < this._comets.length; i++) {
                const comet = this._comets[i];

                comet.elapsedTime += context.elapsed;
                if (comet.elapsedTime > comet.timeToLive) {
                    comet.isAlive = false;
                }
                
                comet.position = comet.position.add(comet.velocity.scale(context.delta));

                if (comet.isAlive) {
                    comet.tailStart = comet.position;
                }

                if (comet.position.distanceTo(comet.tailEnd) > comet.tailLength) {
                    var tailEndVector = Vector.fromPolar(comet.velocity.scale(-1).argument, comet.tailLength);
                    comet.tailEnd = comet.position.add(tailEndVector);
                }

                var tailVector = comet.tailEnd.vectorTo(comet.tailStart);
                if (!comet.isAlive || comet.tailEnd.distanceTo(comet.tailStart) < 5) {
                    var index = this._comets.indexOf(comet);

                    if (index !== -1) {
                        this._comets.splice(index, 1);
                    }
                } 
            }
        }

        render(context: Lightspeed.FrameRenderContext): void {
            var ctx = context.ctx;
            ctx.save();

            for (let i = 0; i < this._comets.length; i++) {
                const comet = this._comets[i];

                var gradient = ctx.createLinearGradient(comet.tailEnd.x, comet.tailEnd.y, comet.position.x, comet.position.y);
                gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
                gradient.addColorStop(1, 'rgba(255, 255, 255, 0.5)');

                ctx.strokeStyle = gradient;

                ctx.beginPath();

                ctx.moveTo(comet.tailEnd.x, comet.tailEnd.y);
                ctx.lineTo(comet.tailStart.x, comet.tailStart.y);

                ctx.stroke();
            }

            ctx.restore();
        }

        private addRandomComet(canvasBox: Box) {
            var startX = Random.Current.next(canvasBox.width);
            var startY = Random.Current.next(canvasBox.height);

            var angle = Random.Current.getBetween(0, Math.PI);

            var position = new Vector(startX, startY);
            var velocity = Vector.fromPolar(angle, 500);

            this._comets.push({ 
                isAlive: true,
                timeToLive: 750,
                elapsedTime: 0,
                position: position,
                velocity: velocity,
                tailStart: position,
                tailEnd: position,
                tailLength: 100,
            });
        }

    }

    class Comet {
        isAlive: boolean = true;
        timeToLive: number = 750;
        elapsedTime: number = 0;
        position: Vector = new Vector();
        velocity: Vector = new Vector();
        tailStart: Vector = new Vector();
        tailEnd: Vector = new Vector();
        tailLength: number = 25;
    }
}