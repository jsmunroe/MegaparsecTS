/// <reference path="FlowContainer.ts" />

namespace Megaparsec {
    export class GamePlayFlow extends FlowElement {
        private _isLoaded: boolean = false;
        private _player: Player;

        constructor() {
            super("GamePlay");

            Game.messenger.subscribe(this, GameMessages.playerKilled, this.onPlayerKilled);
        }

        load(game: Game) {
            game.setScene(this.name);
            game.unpause();

            if (this._isLoaded) {
                return;
            }

            game.clear();
           
            game.pushElement(new Background());
            game.pushElement(new StarField(200));

            this.loadPlayer();

            game.pushElement(TimelinePresets.classic());

            this._isLoaded = true;
        }

        reset(game: Game) {
            game.getScene(this.name).clear();
            this._isLoaded = false;
        }

        loadPlayer() {
            this._player = new Player();
            this._player.position = new Lightspeed.Vector(100, 100);
            this._container.game.getScene(this.name).pushElement(this._player);
        }

        private onPlayerKilled(message: Lightspeed.Utils.Message) {
            this._container.game.requestTimeout(500, null, context => this.loadPlayer());
        }
    }
}