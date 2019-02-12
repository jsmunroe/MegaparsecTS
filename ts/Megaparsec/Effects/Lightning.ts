/// <reference path="Atmosphere.ts" />

namespace Megaparsec {
    export class Lightning extends Atmosphere {
        private _strikeSegments: StrikeSegment[] = [];
        private _color: string;

        constructor(color?: string) {
            super();
            
            this._color = color || 'white';
            this.zIndex = -900;
        }

        update(context: Lightspeed.FrameUpdateContext): void {
            if (Random.Current.nextInt(250) === 0) {
                this.addRandomStrike(context.canvasBox)
            }

            for (let i = 0; i < this._strikeSegments.length; i++) {
                const strikeSegment = this._strikeSegments[i];
                
                strikeSegment.elapsedTime += context.elapsed;
            }
        }

        render(context: Lightspeed.FrameRenderContext): void {
            var ctx = context.ctx;
            ctx.save();

            ctx.lineWidth = 2;
            ctx.strokeStyle = this._color;

            for (let i = 0; i < this._strikeSegments.length; i++) {
                const strikeSegment = this._strikeSegments[i];

                ctx.globalAlpha = 1 - Math.min(1, strikeSegment.elapsedTime / strikeSegment.timeToLive);

                ctx.beginPath();

                ctx.moveTo(strikeSegment.start.x, strikeSegment.start.y);
                ctx.lineTo(strikeSegment.end.x, strikeSegment.end.y);

                if (ctx.globalAlpha > 0.9) {
                    ctx.fillStyle = this._color;
                    ctx.fillRect(0, 0, context.canvasWidth, context.canvasHeight);
                }

                ctx.stroke();
            }

            ctx.restore();
        }

        private addRandomStrike(canvasBox: Box) {
            this._strikeSegments = [];

            var startX = Random.Current.next(canvasBox.width);
            var startY = -10;

            var position = new Vector(startX, startY);

            while (position.y < canvasBox.height) {
                var strikeSegment = this.addRandomStrikeSegment(position);

                position = strikeSegment.end;
                this._strikeSegments.push(strikeSegment);
            }

            var branchCount = Random.Current.nextInt(10);
            for (let i = 0; i < branchCount; i++) {
                position = Random.Current.pick(this._strikeSegments).end;

                var segmentCount = Random.Current.nextInt(5);
                for (let j = 0; j < segmentCount; j++) {
                    var strikeSegment = this.addRandomStrikeSegment(position);

                    position = strikeSegment.end;
                    this._strikeSegments.push(strikeSegment);                  
                }
            }
        }

        private addRandomStrikeSegment(position: Vector) :StrikeSegment {
            var magnitude = Random.Current.getBetween(10, 50);
            var angle = Random.Current.getBetween(Math.PI * 0.1, Math.PI * 0.9);    

            var strikeVector = Vector.fromPolar(angle, magnitude);

            var newPosition = position.add(strikeVector);

            return {
                start: position,
                end: newPosition,
                timeToLive: 750,
                elapsedTime: 0
            };
        }
    }

    class StrikeSegment {
        start: Vector = new Vector();
        end: Vector = new Vector();
        timeToLive: number = 750;
        elapsedTime: number = 0;
    }
}