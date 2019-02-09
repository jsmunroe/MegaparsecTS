namespace Megaparsec {
    export class Hills extends Lightspeed.InertialElement {
        private _maxHillHeight: number = 150;
        private _minHillHeight: number = 50;
        private _maxHillWidth: number = 150;
        private _minHillWidth: number = 100;

        private _hills = [];

        private _baseColor = '#0d1c01';

        constructor(baseColor?: string) {
            super();
            
            if (baseColor) {
                this._baseColor = baseColor;
            }

            this.velocity = new Vector(-200, 0);
        }

        generateHills(hillX: number, canvasWidth: number) {
   
            while (hillX <= canvasWidth + this._maxHillWidth) {
                var height = Random.Current.getBetween(this._minHillHeight, this._maxHillHeight);
                var width = Random.Current.getBetween(this._minHillWidth, this._maxHillWidth);
                var depth = Random.Current.next(40);
                var velocity = depth;
    
                var hill = {
                    start: hillX,
                    width: width,
                    height: height,
                    color: Color.getRandomShade(this._baseColor, 0.0, 0.1),
                    velocity: velocity,
                    depth: depth,
                }
    
                this._hills.push(hill);
    
                hillX += width;
            }
        }

        init(context: Lightspeed.ElementInitContext) {
            this.generateHills(-this._maxHillWidth, context.canvasBox.width);
        }

        update(context: Lightspeed.FrameUpdateContext) {
            super.update(context);

            var hillsToKeep = [];

            for (let i = 0; i < this._hills.length; i++) {
                const hill = this._hills[i];
                
                if (hill.start + hill.width > 0) {
                    hill.start += (this.velocity.x - hill.velocity) * context.delta;
                    hillsToKeep.push(hill);
                }
            }
    
            this._hills = hillsToKeep;
    
            var hillX = -this._maxHillWidth;
            if (this._hills.length) {
                const hill = this._hills[this._hills.length - 1];
                hillX = hill.start + hill.width;
            }
    
            this.generateHills(hillX, context.canvasBox.width);
        }

        render(context: Lightspeed.FrameRenderContext) {
            var canvasHeight = context.canvasHeight;
            var canvasWidth = context.canvasWidth;
            var ctx = context.ctx;
   
            var hills = this._hills.slice(0).sort((i, j) => i.depth - j.depth);
            for (let i = 0; i < hills.length; i++) {
                const hill = hills[i];
                
                var fillStyle = ctx.createLinearGradient(hill.start + hill.width * 0.5, canvasHeight - hill.height + this.position.y, hill.start + hill.width * 0.5, canvasHeight + 10 + this.position.y)
                fillStyle.addColorStop(0, hill.color);
                fillStyle.addColorStop(1, 'black');
    
                ctx.beginPath();
                ctx.fillStyle = fillStyle;
    
                ctx.moveTo(hill.start - hill.width * 0.3, canvasHeight + 10 + this.position.y);
                ctx.lineTo(hill.start + hill.width * 0.3, canvasHeight - hill.height * 0.7 + this.position.y);
                ctx.arcTo(hill.start + hill.width * 0.5, canvasHeight - hill.height + this.position.y, hill.start + hill.width * 0.7, canvasHeight - hill.height * 0.7 + this.position.y, hill.width / 6);
                ctx.lineTo(hill.start + hill.width * 1.3, canvasHeight + 10 + this.position.y);
    
                ctx.fill();
            }
        }
    }
}