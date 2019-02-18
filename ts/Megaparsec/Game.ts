/// <reference path="../LightSpeed/Utils/Messenger.ts" />

namespace Megaparsec {
    export const menuSceneName = "Menu Scene";
    export const gamePlaySceneName = "Game Play Scene";

    export class Game extends Lightspeed.Engine {
        private static s_current: Game;
        
        private static _messenger: Lightspeed.Utils.Messenger = new Lightspeed.Utils.Messenger();

        private _player: Player;

        private _pauseMessage = new Message(Config.strings.pauseMessage, Config.strings.pauseSubtext);

        static get messenger() {
            return this._messenger;
        }

        constructor() {
            super();

            Game.messenger.subscribe(this, GameMessages.playerKilled, this.onPlayerKilled);
        }

        load(config: any) {
            this.clear();
            
            // Game Play Scene
            this.setScene(gamePlaySceneName);
            
            this.pushElement(new Background());
            this.pushElement(new StarField(200));

            this.loadPlayer();

            this.loadTimeline();

            this.pause();

            // Menu Scene
            this.setScene(menuSceneName);

            var starField = new StarField(200);
            starField.velocity = new Vector(-500, 0);
            this.pushElement(new Background());
            this.pushElement(starField);
            this.pushElement(new MainMenu());
        }

        loadPlayer() {
            this._player = new Player();
            this._player.position = new Lightspeed.Vector(100, 100);
            this.pushElement(this._player);
        }

        loadTimeline() {
            this.pushElement(TimelinePresets.classic());
        }

        onPause(scene: Lightspeed.Scene) {
            if (scene.name === gamePlaySceneName) {
                this.setScene(menuSceneName);
            }
        }

        onUnpause(scene: Lightspeed.Scene) {
            if (scene.name === gamePlaySceneName) {
                this.setScene(gamePlaySceneName);
            }
        }

        private onPlayerKilled(message: Lightspeed.Utils.Message) {
            this.requestTimeout(500, null, context => this.loadPlayer());
        }
 
        static run() :void {
            var game = Game.s_current = new Game();
            game.load(Config);
            game.run();

            var gamePlayScene = game.getScene(gamePlaySceneName);

            Keyboard.Current.keys(Config.keys.pause, () => gamePlayScene.togglePause());

            window.addEventListener('blur', () => {
                if (!gamePlayScene.isPaused) {
                    gamePlayScene.pause();
                }
            });
        }
    }

    export class GameMessages {
        public static readonly playerKilled: string = 'playerKilled';
    }
}
