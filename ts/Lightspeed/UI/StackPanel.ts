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

        measure(context: InterfaceRenderContext, width: number, height: number) : Box {
            var desiredWidth: number = 0;
            var desiredHeight: number = 0;

            var remainingHeight = height;

            for (let i = 0; i < this.items.length; i++) {
                const item = this.items[i];
                
                var itemBox = item.measure(context, width, remainingHeight);
                desiredWidth = Math.max(desiredWidth, itemBox.width);
                desiredHeight += itemBox.height;     

                remainingHeight = Math.max(remainingHeight - itemBox.height, 0);
            }

            return new Box(0, 0, desiredWidth, desiredHeight);
        }

        arrange(context: InterfaceRenderContext, finalSize: Box) : Box {
            var nextTop: number = 0;
            var desiredWidth: number = 0;
            var desiredHeight: number = 0;

            for (let i = 0; i < this.items.length; i++) {
                const item = this.items[i];
                
                var itemBox = new Box(item.desiredSize.left, nextTop, item.desiredSize.width, item.desiredSize.height);
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