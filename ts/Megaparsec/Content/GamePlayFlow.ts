/// <reference path="FlowContainer.ts" />

namespace Megaparsec {
    export class GamePlayFlow extends FlowElement {
        private _isInitialized: boolean = false;
        private _player: Player;

        constructor() {
            super("GamePlay");

            Game.messenger.subscribe(this, GameMessages.playerKilled, this.onPlayerKilled);

            Keyboard.Current.keys(Config.keys.pause, () => {
                this.isLoaded && this._container.load(GameSceneNames.pause);
            });

            window.addEventListener('blur', () => {
                this.isLoaded && this._container.load(GameSceneNames.pause);
            });
        }

        load(game: Game) {
            game.setScene(this.name);
            game.unpause();

            if (this._isInitialized) {
                return;
            }

            game.clear();
           
            game.pushElement(new Background());
            game.pushElement(new StarField(200));

            this.loadPlayer();

            game.pushElement(TimelinePresets.classic());

            this._isInitialized = true;
        }

        reset(game: Game) {
            game.getScene(this.name).clear();
            this._isInitialized = false;
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