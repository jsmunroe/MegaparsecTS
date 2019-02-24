/// <reference path="../LightSpeed/Utils/Messenger.ts" />

namespace Megaparsec {
    export const menuSceneName = "Menu Scene";
    export const gamePlaySceneName = "Game Play Scene";

    export class Game extends Lightspeed.Engine {
        private static s_current: Game;
        
        private static _messenger: Lightspeed.Utils.Messenger = new Lightspeed.Utils.Messenger();

        private _player: Player;

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
            this.pushElement(new MainMenu(this));
        }

        loadPlayer() {
            this._player = new Player();
            this._player.position = new Lightspeed.Vector(100, 100);
            this.getScene(gamePlaySceneName).pushElement(this._player);
        }

        loadTimeline() {
            this.pushElement(TimelinePresets.classic());
        }

        private onPlayerKilled(message: Lightspeed.Utils.Message) {
            this.requestTimeout(500, null, context => this.loadPlayer());
        }
 
        static run() :void {
            var game = Game.s_current = new Game();
            game.load(Config);
            game.run();

            Keyboard.Current.keys(Config.keys.pause, () => {
                game.getScene(gamePlaySceneName).pause();
                game.setScene(menuSceneName);
            });

            window.addEventListener('blur', () => {
                game.getScene(gamePlaySceneName).pause();
                game.setScene(menuSceneName);
            });
        }
    }

    export class GameMessages {
        public static readonly playerKilled: string = 'playerKilled';
    }
}
