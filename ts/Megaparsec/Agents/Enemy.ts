namespace Megaparsec {
    export class Enemy extends Agent {
        constructor(controller: Controller, constrainer: Constrainer, sprite: Lightspeed.Sprite, sheild: Sheild) {
            super(controller, constrainer, sprite, sheild);
        }
    }
}