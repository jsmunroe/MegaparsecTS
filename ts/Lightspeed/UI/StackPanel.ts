/// <reference path="UiElement.ts" />

namespace Lightspeed.UI {
    export class StackPanel extends UiElement {
        items: UiElement[] = [];

        constructor(items?: UiElement[]) {
            super();
            
            this.items = items || [];
        }

        render(context: Lightspeed.UI.InterfaceRenderContext): void {
            for (let i = 0; i < this.items.length; i++) {
                const item = this.items[i];
                item.render(context);
            }
        }

        measure(context: InterfaceRenderContext, availableSize: Size) :Size {
            var desiredWidth: number = 0;
            var desiredHeight: number = 0;

            for (let i = 0; i < this.items.length; i++) {
                const item = this.items[i];
                
                var itemDesiredSize = item.measure(context, availableSize);
                desiredWidth = Math.max(desiredWidth, itemDesiredSize.width);
                desiredHeight += itemDesiredSize.height;     

                availableSize = new Size(availableSize.width, Math.max(availableSize.height - itemDesiredSize.height, 0));
            }

            return new Size(desiredWidth, desiredHeight);
        }

        arrange(context: InterfaceRenderContext, finalSize: Box) : Box {
            var nextTop: number = finalSize.top;
            var desiredWidth: number = 0;
            var desiredHeight: number = 0;

            for (let i = 0; i < this.items.length; i++) {
                const item = this.items[i];
                
                var itemBox = new Box(finalSize.left, nextTop, item.desiredSize.width, item.desiredSize.height);
                itemBox = item.arrange(context, itemBox);
                item.renderSize = itemBox;

                desiredWidth = Math.max(desiredWidth, itemBox.width);
                desiredHeight += itemBox.height;     
                nextTop += itemBox.height;
            }

            return new Box(finalSize.left, finalSize.top, desiredWidth, desiredHeight);
        }

    }
}