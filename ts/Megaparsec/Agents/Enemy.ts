namespace Megaparsec {
    export class Enemy extends Agent {
        constructor(controller: Controller, imagePath: string) {
            super(new Human, new Lightspeed.Sprite(imagePath, Config.imageScale));
        }
    }
}