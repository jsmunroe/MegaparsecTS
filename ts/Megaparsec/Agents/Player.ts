namespace Megaparsec {
    export class Player extends Agent {
        constructor() {
            super(new Human, new Lightspeed.Sprite(Config.images.player, Config.imageScale));
        }
    }
}