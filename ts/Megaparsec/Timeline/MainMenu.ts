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
            banner.fontSize = 87;

            menuStack.items.push(banner);


            var subtitle = new Lightspeed.UI.TextElement();
            subtitle.text = 'Alien Craft Advancing';
            subtitle.borderColor = 'yellow';
            subtitle.borderThickness = 5;
            subtitle.backgroundColor = 'green';

            menuStack.items.push(subtitle);

            return menuStack;
        }
    }
}