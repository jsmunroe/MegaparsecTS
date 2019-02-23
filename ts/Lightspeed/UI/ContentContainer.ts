namespace Lightspeed.UI {
    export abstract class ContentContainer extends UiElement {
        content: UiElement;

        constructor(content?: UiElement) {
            super();

            this.content = content;
        }

        add<TElement extends UiElement>(tElement: new () => TElement, setProperties?: (element: TElement) => void) : ContentContainer {
            var element = new tElement();

            setProperties && setProperties(element);

            this.content = element;
            return this;
        }

        measure(context: InterfaceRenderContext, availableSize: Size) :Size {
            if (!this.content) {
                return new Size(0, 0);
            }

            this.desiredSize = this.content.measure(context, availableSize);
            this.desiredSize = this.increaseSize(this.desiredSize, this.margin);
            this.desiredSize = this.increaseSize(this.desiredSize, this.padding);
            this.desiredSize = this.increaseSize(this.desiredSize, this.getBorderThickness());

            return this.desiredSize;
        }

        arrange(context: InterfaceRenderContext, finalSize: Box) :Box {
            if (!this.content) {
                return finalSize;
            }

            var childFinalSize = finalSize;
            childFinalSize = this.reduceBox(childFinalSize, this.margin);
            childFinalSize = this.reduceBox(childFinalSize, this.padding);
            childFinalSize = this.reduceBox(childFinalSize, this.getBorderThickness());

            var renderSize = this.content.arrange(context, childFinalSize);
            this.content.renderSize = renderSize;

            return finalSize;
        }

        hitTest(mouseLocation: Vector) :UiElement {
            if (!this.content) {
                return this;
            }
            
            var element = this.content.hitTest(mouseLocation);
            element && element.onMouseDown(mouseLocation);
        }
    }
}