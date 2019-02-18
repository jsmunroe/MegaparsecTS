namespace Lightspeed.UI {
    export abstract class UiElement {
        backgroundColor: string = 'transparent'
        borderColor: string;
        borderThickness: number = 1;

        horizontalAlignment: HorizontalAlignment = HorizontalAlignment.left;
        verticalAlignment: VerticalAlignment = VerticalAlignment.top;

        padding: Thickness = Thickness.all(5);
        margin: Thickness = Thickness.all(0);

        renderSize: Box;
        desiredSize: Size;

        render(context: Lightspeed.UI.InterfaceRenderContext): void {
            var ctx = context.ctx;
            ctx.save();

            ctx.fillStyle = this.backgroundColor;
            
            if (this.borderColor && this.borderThickness) {
                ctx.strokeStyle = this.borderColor;
                ctx.lineWidth = this.borderThickness;
            }

            var renderSizeLessMarginsAndBorder = this.renderSize;
            renderSizeLessMarginsAndBorder = this.reduceBox(renderSizeLessMarginsAndBorder, this.margin);
            renderSizeLessMarginsAndBorder = this.reduceBox(renderSizeLessMarginsAndBorder, this.getBorderThickness().half);

            ctx.fillRect(renderSizeLessMarginsAndBorder.left, renderSizeLessMarginsAndBorder.top, renderSizeLessMarginsAndBorder.width, renderSizeLessMarginsAndBorder.height);
            ctx.strokeRect(renderSizeLessMarginsAndBorder.left, renderSizeLessMarginsAndBorder.top, renderSizeLessMarginsAndBorder.width, renderSizeLessMarginsAndBorder.height);
            
            ctx.restore();
        }

        protected getBorderThickness() : Thickness {
            return Thickness.all(this.borderThickness)
        }

        abstract measure(context: InterfaceRenderContext, availableSize: Size) :Size;

        arrange(context: InterfaceRenderContext, finalSize: Box) :Box {
            var size = finalSize;
            return finalSize;
        }

        protected reduceBox(box: Box, thickness: Thickness) :Box {
            return new Box(
                box.left + thickness.left,
                box.top + thickness.top,
                box.width - (thickness.left + thickness.right),
                box.height - (thickness.top + thickness.bottom)
            );
        }

        protected increaseBox(box: Box, thickness: Thickness) :Box {
            return new Box( 
                box.left - thickness.left,
                box.top - thickness.top,
                box.width + (thickness.left + thickness.right),
                box.height + (thickness.top + thickness.bottom)
            );
        }

        protected reduceSize(size: Size, thickness: Thickness) :Size {
            return new Size(
                size.width - (thickness.left + thickness.right),
                size.height - (thickness.top + thickness.bottom)
            );
        }

        protected increaseSize(size: Size, thickness: Thickness) :Size{
            return new Size( 
                size.width + (thickness.left + thickness.right),
                size.height + (thickness.top + thickness.bottom)
            );
        }
    }

    export enum HorizontalAlignment {
        left,
        center,
        right,
        stretch,
    }

    export enum VerticalAlignment {
        top,
        center,
        bottom,
        stretch,
    }
}