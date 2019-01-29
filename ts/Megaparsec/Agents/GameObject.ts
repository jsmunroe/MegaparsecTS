/// <reference path="../../LightSpeed/InertialElement.ts" />

import Box = Lightspeed.Box;

namespace Megaparsec {
    export class GameObject extends Lightspeed.InertialElement {
        protected _box: Lightspeed.Box;
        protected _constrainer: Constrainer;

        public controllerProperties: any = { };

        constructor(width: number, height: number, constrainer: Constrainer) {
            super();

            this._box = new Box(-width/2, -height/2, width, height);
            this._constrainer = constrainer;
        }

        public get width() {
            return this.box.width;
        }

        public get height() {
            return this.box.height;
        }

        public get box() :Lightspeed.Box {
            return this._box.offsetV(this.position);
        }

        update(context: Lightspeed.FrameUpdateContext) : void {
            this._constrainer.constrain(this, context);

            super.update(context);
        }

        collidesWith(other: Lightspeed.Element): boolean {
            if (other instanceof GameObject == false) {
                return false;
            }

            return this.box.collides((<GameObject>other).box);
        }

        protected updateBox(width: number, height: number) {
            this._box = new Box(-width/2, -height/2, width, height);
        }
    }
}