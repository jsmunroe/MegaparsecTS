namespace Lightspeed.UI {
    export class TextElement extends UiElement{
        text: string = '';

        

        fontColor: string = 'white';
        fontSize: number = 14;
        fontFamily: string = 'Arial';

        render(context: Lightspeed.UI.InterfaceRenderContext): void {
            var ctx = context.ctx;
            ctx.save();
            
            super.render(context);

            ctx.fillStyle = this.fontColor;

            ctx.font = `${this.fontSize}px ${this.fontFamily}`;
            var textMetrics = ctx.measureText(this.text);

            var renderSizeLessPaddingAndBorder = this.renderSize;
            renderSizeLessPaddingAndBorder = this.margin.reduce(this.renderSize);
            renderSizeLessPaddingAndBorder = renderSizeLessPaddingAndBorder.inflate(-this.borderThickness, -this.borderThickness);

            ctx.fillText(this.text, renderSizeLessPaddingAndBorder.left, renderSizeLessPaddingAndBorder.top + this.fontSize);

            ctx.restore();
        }

        measure(context: InterfaceRenderContext, width: number, height: number) : Box {
            var ctx = context.ctx;
            ctx.save();

            ctx.font = `${this.fontSize}px ${this.fontFamily}`;
            var textMetrics = ctx.measureText(this.text);

            ctx.restore();

            this.desiredSize = new Box(0, 0, textMetrics.width, this.fontSize);
            this.desiredSize = this.margin.increase(this.desiredSize);
            this.desiredSize = this.padding.increase(this.desiredSize);
            this.desiredSize = this.desiredSize.inflate(this.borderThickness, this.borderThickness);

            return this.desiredSize;

        }
    }
}