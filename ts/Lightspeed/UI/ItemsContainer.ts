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

        applyStyle(style: any) {
            super.applyStyle(style);

            var itemStyleKeys = Object.keys(style).filter(i => /^item\./.test(i));
            var itemStyle = {};
            itemStyleKeys.forEach(key => {
                var itemKey = key.replace(/^item\./, '');
                itemStyle[itemKey] = style[key];
            });

            this.items.forEach(item => {
                item.applyStyle(style);
            });
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