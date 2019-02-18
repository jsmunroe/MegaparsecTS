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

            if (this.content.horizontalAlignment === HorizontalAlignment.center) {
                finalSize = finalSize.offset(availableSize.width / 2 - contentDesiredSize.width / 2, 0);
            } else if (this.content.horizontalAlignment === HorizontalAlignment.right) {
                finalSize = finalSize.offset(availableSize.width - contentDesiredSize.width, 0);
            }

            if (this.content.verticalAlignment === VerticalAlignment.center) {
                finalSize = finalSize.offset(0, availableSize.height / 2 - contentDesiredSize.height / 2);
            } else if (this.content.verticalAlignment === VerticalAlignment.bottom) {
                finalSize = finalSize.offset(0, availableSize.height - contentDesiredSize.height);
            }

            this.content.renderSize = this.content.arrange(interfaceRenderContext, finalSize);

            this.content.render(interfaceRenderContext);
        }
    }
}