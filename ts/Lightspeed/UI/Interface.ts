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

            var availableSize = new Size(context.canvasWidth, context.canvasHeight);

            var contentDesiredSize = this.content.measure(interfaceRenderContext, availableSize);
            var finalSize = Box.fromSize(contentDesiredSize);
            this.content.renderSize = this.content.arrange(interfaceRenderContext, finalSize);

            this.content.render(interfaceRenderContext);
        }
    }
}