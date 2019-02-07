/// <reference path="../LightSpeed/Utils/Messenger.ts" />

namespace Megaparsec {
    export class Game extends Lightspeed.Engine {
        private static s_current: Game;
        
        private static _messenger: Lightspeed.Utils.Messenger = new Lightspeed.Utils.Messenger();

        private _player: Player;

        private _pauseMessage = new Message(Config.strings.pauseMessage, Config.strings.pauseSubtext);

        static get messenger() {
            return this._messenger;
        }

        load(config: any) {
            this.clear();
            
            this.pushElement(new Background());
            this.pushElement(new StarField(200));
            this.pushElement(new Hills());

            this._player = new Player();
            this._player.position = new Lightspeed.Vector(100, 100);
            this.pushElement(this._player);
            
            this.loadLevel(config);
        }

        loadLevel(config: any) {
            var level = LevelBuilder.start()
                .pushWave('enemy1', 1)
                .pushWave('enemy2', 1)
                .pushWave('enemy3', 1)
                .pushWave('enemy2', 2)
                .build();

            this.pushElement(level);
        }

        pause() {
            this.pushElement(this._pauseMessage);

            super.pause();
        }

        unpause() {
            this.removeElement(this._pauseMessage);

            super.unpause();
        }

        static run() :void {
            var game = Game.s_current = new Game();
            game.load(Config);
            game.run();

            Utils.keyboard.keys(Config.keys.pause, () => game.togglePause());

            window.addEventListener('blur', () => {
                if (!game.isPaused) {
                    game.pause();
                }
            });
        }
    }
}
