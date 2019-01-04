/// <reference path="../../LightSpeed/InertialElement.ts" />

namespace Megaparsec {
    export class Agent extends Lightspeed.InertialElement {
        private _controller: Controller;
        private _sprite: Lightspeed.Sprite;

        constructor(controller: Controller, sprite: Lightspeed.Sprite) {
            super();

            this._controller = controller;
            this._sprite = sprite;
        }

        public get width() {
            return this._sprite.width;
        }

        public get height() {
            return this._sprite.height;
        }

        public get box() :Lightspeed.Box {
            return Lightspeed.Box.fromCenter(this.position, this.width, this.height);
        }

        public set box(value) {
            this.position = value.center;
        }

        update(context: Lightspeed.FrameUpdateContext) : void {
            this._controller.update(this, context.canvasBox);

            super.update(context);
        }

        render(context: Lightspeed.FrameRenderContext) : void {
            this._sprite.draw(context.ctx, this.position);
        }
    }
}