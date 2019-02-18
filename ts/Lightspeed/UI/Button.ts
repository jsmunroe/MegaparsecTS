/// <reference path="UiElement.ts" />

namespace Lightspeed.UI {
    export class Button extends UiElement{
        content: UiElement;

        hilightColor: string = 'white';

        render(context: Lightspeed.UI.InterfaceRenderContext): void {
            var ctx = context.ctx;
            ctx.save();

            super.render(context);

            this.content.render(context);
            
            ctx.restore();        
        }

        measure(context: InterfaceRenderContext, availableSize: Size) :Size {
            var ctx = context.ctx;
            ctx.save();

            this.desiredSize = this.content.measure(context, availableSize);

            return this.desiredSize;

        }

    }
}