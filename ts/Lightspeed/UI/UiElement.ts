namespace Lightspeed.UI {
    export abstract class UiElement {
        backgroundColor: string = 'transparent'
        borderColor: string;
        borderThickness: number = 1;

        padding: Thickness = new Thickness(5);
        margin: Thickness = new Thickness(0);

        renderSize: Box;
        desiredSize: Box;

        render(context: Lightspeed.UI.InterfaceRenderContext): void {
            var ctx = context.ctx;
            ctx.save();

            ctx.fillStyle = this.backgroundColor;
            
            if (this.borderColor && this.borderThickness) {
                ctx.strokeStyle = this.borderColor;
                ctx.lineWidth = this.borderThickness;
            }

            var renderSizeLessMargins = this.renderSize;
            renderSizeLessMargins = this.margin.reduce(renderSizeLessMargins);
            renderSizeLessMargins = renderSizeLessMargins.inflate(-this.borderThickness, -this.borderThickness);

            ctx.fillRect(renderSizeLessMargins.left, renderSizeLessMargins.top, renderSizeLessMargins.width, renderSizeLessMargins.height);
            ctx.strokeRect(renderSizeLessMargins.left, renderSizeLessMargins.top, renderSizeLessMargins.width, renderSizeLessMargins.height);
            
            ctx.restore();
        }

        abstract measure(context: InterfaceRenderContext, width: number, height: number) : Box;

        arrange(context: InterfaceRenderContext, finalSize: Box) : Box {
            var size = finalSize;
            return finalSize;
        }
    }
}