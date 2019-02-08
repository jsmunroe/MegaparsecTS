/// <reference path="GameObject.ts" />
namespace Megaparsec {
    export class Agent extends GameObject {
        private _controller: Controller;
        private _sprite: Lightspeed.Sprite;
        
        public controllerProperties: any = { };

        constructor(controller: Controller, constrainer: Constrainer, sprite: Lightspeed.Sprite) {
            super(sprite.width, sprite.height, constrainer);

            this._controller = controller;
            this._sprite = sprite;

            sprite.registerLoadCallback(i => this.updateBox(i.width, i.height));
        }

        init(context: Lightspeed.ElementInitContext) : void {
            this._controller.init(this, context.canvasBox);
        }

        update(context: Lightspeed.FrameUpdateContext) : void {
            this._controller.update(this, context);

            super.update(context);
        }

        render(context: Lightspeed.FrameRenderContext) : void {
            this._sprite.draw(context.ctx, this.position);
        }

        collide(context: Lightspeed.ElementCollisionContext): void {
            if (context.otherElement instanceof Shot) {
                return; // Let Shot handle the Agent destruction.
            }

            this.explode(context);
        }

        explode(context: Lightspeed.ElementCollisionContext) {
            this.kill();
            context.pushElement(new Explosion(this));
        }
    }
}