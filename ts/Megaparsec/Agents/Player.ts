namespace Megaparsec {
    export class Player extends Agent {
        constructor() {
            super(new Human, Constrainer.boxIn, new Lightspeed.Sprite(Config.agents.player.image, Config.imageScale), null);
        }

        protected onKill() {
            Game.messenger.publish(GameMessages.playerKilled);
        }
    }
}