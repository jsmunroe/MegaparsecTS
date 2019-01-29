namespace Megaparsec {
    export class Player extends Agent {
        constructor() {
            super(new Human, Constrainer.boxIn, new Lightspeed.Sprite(Config.agents.player.image, Config.imageScale));
        }

        collide(context: Lightspeed.ElementCollisionContext): void {
            // optionally overloaded by extending classes to handle collission.
        }
    }
}