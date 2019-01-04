namespace Megaparsec {
    export class Game extends Lightspeed.Engine {
        private static s_current: Game;
        
        private _player: Player;

        load(config: any) {
            this.clear();
            
            this.pushElement(new Background());
            this.pushElement(new StarField(200));
            this.pushElement(new Hills());

            this._player = new Player();
            this._player.position = new Lightspeed.Vector(100, 100);
            this.pushElement(this._player);
        }

        static run() :void {
            Game.s_current = new Game();
            Game.s_current.load(Config);
            Game.s_current.run();
        }
    }
}
