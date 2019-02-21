/// <reference path="UiElement.ts" />
/// <reference path="ContentContainer.ts" />

namespace Lightspeed.UI {
    export class Button extends ContentContainer{
        content: UiElement;

        hilightColor: string = 'white';

        render(context: Lightspeed.UI.InterfaceRenderContext): void {
            var ctx = context.ctx;
            ctx.save();

            super.render(context);

            this.content.render(context);
            
            ctx.restore();        
        }



    }
}