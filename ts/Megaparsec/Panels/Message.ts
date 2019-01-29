namespace Megaparsec {
    export class Message extends Lightspeed.Element {
        private _text: string = '';
        private _subtext: string = null;

        public color: string = Config.styles.textColor;
        public textFontSize: number = Config.styles.messageTextSize;
        public subtextFontSize: number = Config.styles.messageSubtextSize;

        constructor(text: string, subtext?: string) {
            super();

            this._text = text;
            this._subtext = subtext;
        }

        render(context: Lightspeed.FrameRenderContext) {
            var canvasHeight = context.canvasHeight;
            var canvasWidth = context.canvasWidth;
            var ctx = context.ctx;
   
            ctx.fillStyle = this.color;
            ctx.font = `${this.textFontSize}px Arial`;

            var subtextHeight = this._subtext ? this.subtextFontSize : 0;

            var textBounds = ctx.measureText(this._text);
            ctx.fillText(this._text, canvasWidth / 2 - textBounds.width / 2, canvasHeight / 2 - this.textFontSize / 2 - subtextHeight / 2)    
            
            if (this._subtext) {
                ctx.font = `${this.subtextFontSize}px Arial`;

                var subtextBounds = ctx.measureText(this._subtext);
                ctx.fillText(this._subtext, canvasWidth / 2 - subtextBounds.width / 2, canvasHeight / 2 - subtextHeight / 2 + subtextHeight / 2)
            }
       }
    }
}