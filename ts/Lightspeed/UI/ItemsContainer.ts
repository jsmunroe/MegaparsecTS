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

    }
}