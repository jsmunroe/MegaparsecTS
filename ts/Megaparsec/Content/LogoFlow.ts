/// <reference path="FlowContainer.ts" />

namespace Megaparsec {
    export class LogoFlow extends FlowElement {
        get canContinue() {
            return false;
        }

        constructor() {
            super(GameSceneNames.logo);
        }

        load(game: Game) {
            game.setScene(this.name);
            game.clear();

            var starField = new StarField(200);
            starField.velocity = new Vector(-500, 0);
            game.pushElement(new Background());
            game.pushElement(starField);
            game.pushElement(new Logo(this));
        }

        startGame() {
            this._container.load(GameSceneNames.mainMenu);
        }
    }
}
