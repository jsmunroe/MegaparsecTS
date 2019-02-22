/// <reference path="../../lightspeed/UI/Interface.ts" />

namespace Megaparsec {
    export class MainMenu extends Lightspeed.UI.Interface {
        constructor() {
            super();

            this.build(Lightspeed.UI.StackPanel, p => {
                p.horizontalAlignment = Lightspeed.UI.HorizontalAlignment.center;

                p.add(Lightspeed.UI.TextElement, q => {
                    q.text = 'Megaparsec';
                    q.fontFamily = 'TI99Basic';
                    q.fontColor = '#44EEFF'
                    q.fontSize = 128;
                    q.horizontalAlignment = Lightspeed.UI.HorizontalAlignment.center;
                    q.margin = new Lightspeed.UI.Thickness(0, -50, 0, 0);
                })

                .add(Lightspeed.UI.TextElement, q => {
                    q.text = 'Alien craft advancing';
                    q.fontFamily = 'TI99Basic';
                    q.fontColor = '#44EEFF'
                    q.fontSize = 32;
                    q.horizontalAlignment = Lightspeed.UI.HorizontalAlignment.center;
                })

                .add(Lightspeed.UI.Button, q => {
                    q.horizontalAlignment = Lightspeed.UI.HorizontalAlignment.center;
                    q.padding = Lightspeed.UI.Thickness.all(15);
                    q.margin = Lightspeed.UI.Thickness.all(15);
                    q.add(Lightspeed.UI.TextElement, r => {
                        r.text = 'Begin New Adventure'
                        r.fontFamily = 'TI99Basic';
                        r.fontColor = '#44EEFF'
                        r.fontSize = 24;
                        r.horizontalAlignment = Lightspeed.UI.HorizontalAlignment.center;
                    });
                });
            });
        }
    }
}