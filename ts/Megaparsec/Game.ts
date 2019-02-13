/// <reference path="../LightSpeed/Utils/Messenger.ts" />

namespace Megaparsec {
    export const menuSegment = "Menu Segment";
    export const gamePlaySegment = "Game Play Segment";

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
            
            this.setSegment(gamePlaySegment);
            
            this.pushElement(new Background());
            this.pushElement(new StarField(200));

            this.loadPlayer();

            this.loadTimeline();

            this.setSegment(menuSegment);
        }

        loadPlayer() {
            this._player = new Player();
            this._player.position = new Lightspeed.Vector(100, 100);
            this.pushElement(this._player);
        }

        loadTimeline() {
            this.pushElement(TimelinePresets.classic());
        }

        pause() {
            if (this.currentSegment.name === gamePlaySegment) {
                this.pushElement(this._pauseMessage);
            }

            super.pause();
        }

        unpause() {
            if (this.currentSegment.name === gamePlaySegment) {
                this.removeElement(this._pauseMessage);
            }

            super.unpause();
        }

        private onPlayerKilled(message: Lightspeed.Utils.Message) {
            this.requestTimeout(500, null, context => this.loadPlayer());
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
