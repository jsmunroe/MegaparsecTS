/// <reference path="UiElement.ts" />

namespace Lightspeed.UI {
    export class Interface extends Element {
        content: UiElement;

        constructor(content?: UiElement) {
            super();

            this.content = content;
        }

        render(context: Lightspeed.FrameRenderContext): void {
            var interfaceRenderContext = new InterfaceRenderContext(null, context);

            var contentBox = this.content.measure(interfaceRenderContext, context.canvasWidth, context.canvasHeight);
            var finalSize = new Box(0, 0, Math.min(context.canvasWidth, contentBox.width), Math.min(context.canvasHeight, contentBox.height))
            this.content.renderSize = this.content.arrange(interfaceRenderContext, finalSize);
            this.content.renderSize = finalSize;

            this.content.render(interfaceRenderContext);
        }
    }
}