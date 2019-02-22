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
            ctx.textBaseline = 'top';

            ctx.font = `${this.fontSize}px ${this.fontFamily}`;
            var textMetrics = ctx.measureText(this.text);

            var reducedRenderSize = this.renderSize;
            reducedRenderSize = this.reduceBox(reducedRenderSize, this.margin);
            reducedRenderSize = this.reduceBox(reducedRenderSize, this.padding);
            reducedRenderSize = this.reduceBox(reducedRenderSize, this.getBorderThickness())

            ctx.fillText(this.text, reducedRenderSize.left, reducedRenderSize.top);

            ctx.restore();
        }

        measure(context: InterfaceRenderContext, availableSize: Size) :Size {
            var ctx = context.ctx;
            ctx.save();

            ctx.font = `${this.fontSize}px ${this.fontFamily}`;
            var textMetrics = ctx.measureText(this.text);

            ctx.restore();

            this.desiredSize = new Size(textMetrics.width, this.fontSize);
            this.desiredSize = this.increaseSize(this.desiredSize, this.margin);
            this.desiredSize = this.increaseSize(this.desiredSize, this.padding);
            this.desiredSize = this.increaseSize(this.desiredSize, this.getBorderThickness());

            return this.desiredSize;

        }

        hitTest(mouseLocation: Vector) :UiElement {
            return this;
        }
    }
}