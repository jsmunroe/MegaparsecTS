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

            return this.desiredSize;
        }

        arrange(context: InterfaceRenderContext, finalSize: Box) :Box {
            if (!this.content) {
                return finalSize;
            }

            var renderSize = this.content.arrange(context, finalSize);
            this.content.renderSize = renderSize;

            return renderSize;
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