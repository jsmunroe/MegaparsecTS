/// <reference path="GameObject.ts" />
namespace Megaparsec {
    export class Agent extends GameObject {
        private _controller: Controller;
        private _sprite: Lightspeed.Sprite;
        private _sheild: Sheild;
        
        public controllerProperties: any = { };

        constructor(controller: Controller, constrainer: Constrainer, sprite: Lightspeed.Sprite, sheild: Sheild) {
            super(sprite.width, sprite.height, constrainer);

            this._controller = controller;
            this._sprite = sprite;
            this._sheild = sheild;

            sprite.registerLoadCallback(i => this.updateBox(i.width, i.height));
        }

        init(context: Lightspeed.ElementInitContext) : void {
            this._controller.init(this, context.canvasBox);
        }

        update(context: Lightspeed.FrameUpdateContext) : void {
            if (this._sheild) {
                this._sheild.update(context);
            }
        
            this._controller.update(this, context);
            
            super.update(context);
        }

        render(context: Lightspeed.FrameRenderContext) : void {
            this._sprite.draw(context.ctx, this.position, context.getFrame(100, this._sprite.frameCount));
            if (this._sheild) {
                this._sheild.draw(context.ctx, this.position, this.width, this.height);
            }
        }

        onCollide(context: Lightspeed.ElementCollisionContext): void {
            if (context.otherElement instanceof Shot) {
                if ((<Shot>context.otherElement).origin === this) {
                    return; 
                }
                
                if (this._sheild && !this._sheild.collide(context)) {
                    return;
                }
            }

            this.explode(context);
        }

        explode(context: Lightspeed.ElementCollisionContext) {
            this.kill();
            context.pushElement(new Explosion(this));
        }
    }
}