/// <reference path="FlowContainer.ts" />

namespace Megaparsec {
    export class MainMenuFlow extends FlowElement {
        get canContinue() {
            return false;
        }

        constructor() {
            super(GameSceneNames.mainMenu);
        }

        load(game: Game) {
            game.setScene(this.name);
            game.clear();

            var starField = new StarField(200);
            starField.velocity = new Vector(-500, 0);
            game.pushElement(new Background());
            game.pushElement(starField);
            game.pushElement(new MainMenu(this));
        }

        newGame() {
            this._container.load(GameSceneNames.gamePlay, true);
        }

        continueGame() {
            this._container.load(GameSceneNames.gamePlay);
        }
    }
}
