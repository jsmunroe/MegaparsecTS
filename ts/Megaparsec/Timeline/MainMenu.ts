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
            banner.borderThickness = 1;
            banner.borderColor = '#22222';
            banner.text = 'Megaparsec';
            banner.fontFamily = 'TI99Basic';
            banner.fontColor = '#44EEFF'
            banner.fontSize = 128;

            menuStack.items.push(banner);

            var subtitle = new Lightspeed.UI.TextElement();
            subtitle.borderThickness = 1;
            subtitle.borderColor = '#22222';
            subtitle.text = 'Alien craft advancing';
            subtitle.fontFamily = 'TI99Basic';
            subtitle.fontColor = '#44EEFF'
            subtitle.fontSize = 32;

            menuStack.items.push(subtitle);

            return menuStack;
        }
    }
}