namespace Megaparsec {
    export class Player extends Agent {
        constructor() {
            super(new Human, new Lightspeed.Sprite(Config.agents.player.image, Config.imageScale));

            this.horizontalConstraintTopology = AgentConstraintToplogy.Block;
            this.verticalConstraintTopology = AgentConstraintToplogy.Block;
        }

        
        collide(context: Lightspeed.ElementCollisionContext): void {
            // optionally overloaded by extending classes to handle collission.
        }
    }
}