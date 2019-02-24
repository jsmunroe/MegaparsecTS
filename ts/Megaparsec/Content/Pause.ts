/// <reference path="../../lightspeed/UI/Interface.ts" />

namespace Megaparsec {
    export class Pause extends Lightspeed.UI.Interface {
        private _pauseFlow: PauseFlow;

        constructor(pauseFlow: PauseFlow) {
            super();

            this._pauseFlow = pauseFlow;

            var buttonStyle = {
                horizontalAlignment: Lightspeed.UI.HorizontalAlignment.center,
                padding: Lightspeed.UI.Thickness.all(10),
                margin: new Lightspeed.UI.Thickness(0, 10, 0, 0),
                borderThickness: 1,
                borderColor: '#000055',
                hilightColor: 'rgba(0, 0, 85, 0.3)',
                minWidth: 250,
                "content.fontFamily": 'TI99Basic',
                "content.fontColor": '#44EEFF',
                "content.fontSize": 24,
                "content.margin": new Lightspeed.UI.Thickness(0, -15, 0, 0),
                "content.horizontalAlignment": Lightspeed.UI.HorizontalAlignment.center
            }

            this.build(Lightspeed.UI.StackPanel, p => {
                p.horizontalAlignment = Lightspeed.UI.HorizontalAlignment.center;
                p.verticalAlignment = Lightspeed.UI.VerticalAlignment.center;

                p.add(Lightspeed.UI.TextElement, q => {
                    q.text = 'Megaparsec';
                    q.fontFamily = 'TI99Basic';
                    q.fontColor = '#44EEFF'
                    q.fontSize = 128;
                    q.horizontalAlignment = Lightspeed.UI.HorizontalAlignment.center;
                    q.margin = new Lightspeed.UI.Thickness(0, -75, 0, 0);
                })

                .add(Lightspeed.UI.TextElement, q => {
                    q.text = 'Game is Paused';
                    q.fontFamily = 'TI99Basic';
                    q.fontColor = '#44EEFF'
                    q.fontSize = 32;
                    q.horizontalAlignment = Lightspeed.UI.HorizontalAlignment.center;
                    q.margin = new Lightspeed.UI.Thickness(0, 0, 0, 25);
                })

                .add(Lightspeed.UI.Button, q => {
                    q.addText('Continue Playing');
                    q.applyStyle(buttonStyle);
                    q.addMouseDownHandler(v => this._pauseFlow.continueGame());
                })

                .add(Lightspeed.UI.Button, q => {
                    q.addText('End Game');
                    q.applyStyle(buttonStyle);
                    q.addMouseDownHandler(v => this._pauseFlow.endGame());
                });

            });
        }
    }
}