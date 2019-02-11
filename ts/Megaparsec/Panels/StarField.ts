/// <reference path="../Lightspeed.ts" />

namespace Megaparsec {
    export class StarField extends Lightspeed.InertialElement {
        private _starCount: number;
        private _stars = [];

        constructor(starCount?: number) {
            super();

            this.zIndex = -1000;
            
            this._starCount = starCount || 25;
        }

        init(context: Lightspeed.ElementInitContext) {
            for (var i = 0; i < this._starCount; i++) {
  
                this._stars.push({
                    x: Random.Current.next(context.canvasBox.width),
                    y: Random.Current.next(context.canvasBox.height),
                    relativeVelocity: Random.Current.next(),
                    color: Color.getRandomColor(),
                    radius: Random.Current.next() * 0.5,
                    twinkle: Random.Current.nextInt(5000) === 1 ? 0 : 1
                });
            }
        }

        update(context: Lightspeed.FrameUpdateContext) {
            super.update(context);
            
            for (let i = 0; i < this._stars.length; i++) {
                const star = this._stars[i];

                var localVelocityX = this.velocity.x * star.relativeVelocity;
                var localVelocityY = this.velocity.y * star.relativeVelocity;

                star.x += localVelocityX * context.delta;
                star.y += localVelocityY * context.delta;

                if (star.twinkle && Random.Current.nextInt(5000) === 1) {
                    star.twinkle = 0;
                } else if (!star.twinkle && Random.Current.nextInt(50) === 1) {
                    star.twinkle = 1;
                }
    
                if (localVelocityX < 0 && star.x < -star.radius) {
                    star.x = context.canvasBox.width + star.radius;
                } else if (localVelocityX > 0 && star.x > context.canvasBox.width + star.radius) {
                    star.x = -star.radius;
                }

                if (localVelocityY < 0 && star.y < -star.radius) {
                    star.y = context.canvasBox.height + star.radius;
                } else if (localVelocityY > 0 && star.y > context.canvasBox.height + star.radius) {
                    star.y = -star.radius;
                }
            };
        }

        render(context: Lightspeed.FrameRenderContext) {
            var ctx = context.ctx;
            
            this._stars.forEach(i => {
    
                if (i.twinkle) {
    
                    ctx.fillStyle = i.color;
                    ctx.beginPath();
                    ctx.arc(i.x, i.y, i.radius, 0, 2 * Math.PI);
                    ctx.fill();
                }
    
            });
        }
    }
}