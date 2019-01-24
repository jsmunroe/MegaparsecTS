namespace Megaparsec {
    export class Enemy extends Agent {
        constructor(controller: Controller, imagePath: string) {
            super(controller, new Lightspeed.Sprite(imagePath, Config.imageScale));
        }
    }
}