namespace Megaparsec {
    export class Enemy extends Agent {
        constructor(controller: Controller, constrainer: Constrainer, imagePath: string) {
            super(controller, constrainer, new Lightspeed.Sprite(imagePath, Config.imageScale));
        }
    }
}