/// <reference path="../../lightspeed/UI/Interface.ts" />

namespace Megaparsec {
    export class MainMenu extends Lightspeed.UI.Interface {
        private _game: Game;

        constructor(game: Game) {
            super();

            this._game = game;

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
                    q.text = 'Alien craft advancing';
                    q.fontFamily = 'TI99Basic';
                    q.fontColor = '#44EEFF'
                    q.fontSize = 32;
                    q.horizontalAlignment = Lightspeed.UI.HorizontalAlignment.center;
                    q.margin = new Lightspeed.UI.Thickness(0, 0, 0, 25);
                })

                .add(Lightspeed.UI.Button, q => {
                    q.addText('Begin New Adventure');
                    q.applyStyle(buttonStyle);
                    q.addMouseDownHandler(v => this.onNewGame());
                })

                .add(Lightspeed.UI.Button, q => {
                    q.addText('Continue Adventure');
                    q.applyStyle(buttonStyle);
                    q.isEnabled = false;
                    q.addMouseDownHandler(v => this.onContinueGame());
                });

            });
        }

        private onNewGame() {
            this._game.setScene(gamePlaySceneName);
            this._game.unpause();
        }

        private onContinueGame() {
            this._game.setScene(gamePlaySceneName);
            this._game.unpause();
        }
    }
}