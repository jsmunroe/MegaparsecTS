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

        constructor() {
            super();

            Game.messenger.subscribe(this, GameMessages.playerKilled, this.onPlayerKilled);
        }

        load(config: any) {
            this.clear();
            
            this.pushElement(new Background());
            this.pushElement(new StarField(200));
            this.pushElement(new Hills());

            this.loadPlayer();

            this.loadTimeline();
        }

        loadPlayer() {
            this._player = new Player();
            this._player.position = new Lightspeed.Vector(100, 100);
            this.pushElement(this._player);
        }

        loadTimeline() {
            var timeLine: Timeline = Timeline.start()
                .addLevel(level => level
                    .pushWave('enemy1', 1)
                    .pushWave('enemy2', 1)
                    .pushWave('enemy3', 1)
                    .pushWave('enemy2', 2)
                    .build())
                .addEvent(new ChangeLevel(2, '#DD0000'))
                .addLevel(level => level
                    .pushWave('enemy2', 1)
                    .pushWave('enemy1', 1)
                    .pushWave('enemy3', 1)
                    .pushWave('enemy2', 2)
                    .build())

            this.pushElement(timeLine);
        }

        pause() {
            this.pushElement(this._pauseMessage);

            super.pause();
        }

        unpause() {
            this.removeElement(this._pauseMessage);

            super.unpause();
        }

        private onPlayerKilled(message: Lightspeed.Utils.Message) {
            this.loadPlayer();
        }

        static run() :void {
            var game = Game.s_current = new Game();
            game.load(Config);
            game.run();

            Keyboard.Current.keys(Config.keys.pause, () => game.togglePause());

            window.addEventListener('blur', () => {
                if (!game.isPaused) {
                    game.pause();
                }
            });
        }
    }

    export class GameMessages {
        public static readonly playerKilled: string = 'playerKilled';
    }
}
