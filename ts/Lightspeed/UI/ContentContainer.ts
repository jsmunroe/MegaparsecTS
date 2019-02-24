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

            availableSize = this.constrainSize(availableSize);

            this.desiredSize = this.content.measure(context, availableSize);
            this.desiredSize = this.increaseSize(this.desiredSize, this.margin);
            this.desiredSize = this.increaseSize(this.desiredSize, this.padding);
            this.desiredSize = this.increaseSize(this.desiredSize, this.getBorderThickness());

            this.desiredSize = this.constrainSize(this.desiredSize);

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

            if (this.content.horizontalAlignment === HorizontalAlignment.center) {
                childFinalSize = childFinalSize.withLeft(left => left + childFinalSize.width / 2 - this.content.desiredSize.width / 2)
                                               .withWidth(width => this.content.desiredSize.width);
            } else if (this.content.horizontalAlignment === HorizontalAlignment.right) {
                childFinalSize = childFinalSize.withLeft(left => left + childFinalSize.width - this.content.desiredSize.width)
                                               .withWidth(width => this.content.desiredSize.width);
            } 

            var renderSize = this.content.arrange(context, childFinalSize);
            this.content.renderSize = renderSize;

            return finalSize;
        }

        applyStyle(style: any) {
            super.applyStyle(style);

            var contentStyleKeys = Object.keys(style).filter(i => /^content\./.test(i));
            var contentStyle = {};
            contentStyleKeys.forEach(key => {
                var contentKey = key.replace(/^content\./, '');
                contentStyle[contentKey] = style[key];
            });
            this.content && this.content.applyStyle(contentStyle);
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