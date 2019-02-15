/// <reference path="../../lightspeed/UI/Interface.ts" />

namespace Megaparsec {
    export class MainMenu extends Lightspeed.UI.Interface {
        constructor() {
            super();

            this.content = this.createContent();
        }

        private createContent() :Lightspeed.UI.UiElement {
            var menuStack = new Lightspeed.UI.StackPanel();
            
            var banner = new Lightspeed.UI.TextElement();
            banner.text = 'Megaparsec';
            banner.borderColor = 'red';
            banner.borderThickness = 5;
            banner.backgroundColor = 'blue';

            menuStack.items.push(banner);

            return menuStack;
        }
    }
}