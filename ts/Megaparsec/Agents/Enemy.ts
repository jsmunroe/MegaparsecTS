namespace Megaparsec {
    export class Enemy extends Agent {
        constructor(controller: Controller, constrainer: Constrainer, sprite: Lightspeed.Sprite, sheild: Sheild) {
            super(controller, constrainer, sprite, sheild);
        }

        onCollide(context: Lightspeed.ElementCollisionContext): void {
            if (context.otherElement instanceof Enemy) {
                return;
            }

            super.onCollide(context);
        }
    }
}