/// <reference path="../../lightspeed/UI/Interface.ts" />

namespace Megaparsec {
    export class MainMenu extends Lightspeed.UI.Interface {
        constructor() {
            super();

            this.content = this.createContent();
        }

        private createContent() :Lightspeed.UI.UiElement {
            var menuStack = new Lightspeed.UI.StackPanel();
            menuStack.horizontalAlignment = Lightspeed.UI.HorizontalAlignment.center;
            
            var banner = new Lightspeed.UI.TextElement();
            banner.text = 'Megaparsec';
            banner.fontFamily = 'TI99Basic';
            banner.fontColor = '#44EEFF'
            banner.fontSize = 128;
            banner.horizontalAlignment = Lightspeed.UI.HorizontalAlignment.center;
            banner.margin = new Lightspeed.UI.Thickness(0, -50, 0, 0);

            menuStack.items.push(banner);

            var subtitle = new Lightspeed.UI.TextElement();
            subtitle.text = 'Alien craft advancing';
            subtitle.fontFamily = 'TI99Basic';
            subtitle.fontColor = '#44EEFF'
            subtitle.fontSize = 32;
            subtitle.horizontalAlignment = Lightspeed.UI.HorizontalAlignment.center;

            menuStack.items.push(subtitle);

            return menuStack;
        }
    }
}