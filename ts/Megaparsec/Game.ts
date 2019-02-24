/// <reference path="../LightSpeed/Utils/Messenger.ts" />

namespace Megaparsec {

    export class Game extends Lightspeed.Engine {
        private static s_current: Game;
        private static _messenger: Lightspeed.Utils.Messenger = new Lightspeed.Utils.Messenger();

        private _flowContainer: FlowContainer;

        static get messenger() {
            return this._messenger;
        }

        constructor() {
            super();
        }

        load(config: any) {
            this._flowContainer = new FlowContainer(this)
                .add(new MainMenuFlow())
                .add(new GamePlayFlow())
                .add(new PauseFlow());

            this._flowContainer.load(GameSceneNames.mainMenu);
        }
 
        static run() :void {
            var game = Game.s_current = new Game();
            game.load(Config);
            game.run();
        }
    }

    export class GameMessages {
        public static readonly playerKilled: string = 'playerKilled';
    }

    export class GameSceneNames {
        public static readonly logo: string = 'Logo';
        public static readonly gamePlay: string = 'GamePlay';
        public static readonly mainMenu: string = 'MainMenu';
        public static readonly pause: string = 'Pause';
    }
}
