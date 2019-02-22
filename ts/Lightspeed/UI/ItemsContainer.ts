namespace Lightspeed.UI {
    export abstract class ItemsContainer extends UiElement {
        items: UiElement[] = [];

        constructor(items?: UiElement[]) {
            super();
            
            this.items = items || [];
        }

        add<TElement extends UiElement>(tElement: new () => TElement, setProperties?: (element: TElement) => void) : ItemsContainer {
            var element = new tElement();

            setProperties && setProperties(element);

            this.items.push(element);

            return this;
        }

        hitTest(mouseLocation: Vector) :UiElement {
            var item :UiElement;

            var hitItem :UiElement;
            this.items.forEach(i => {
                if (i.renderSize && i.renderSize.containsVector(mouseLocation)) {
                    hitItem = i.hitTest(mouseLocation);
                }
            });

            return hitItem || this;
        }

    }
}