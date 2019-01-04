namespace Lightspeed {
    export class InertialElement extends Element {
        private _position: Vector = new Vector();
        private _velocity: Vector = new Vector();
        private _acceleration: Vector = new Vector();

        public get position() {
            return this._position;
        }

        public set position(value) {
            this._position = value;
        }

        public get velocity() {
            return this._velocity;
        }

        public set velocity(value) {
            this._velocity = value;
        }

        public get acceleration() {
            return this._acceleration;
        }

        public set acceleration(value) {
            this._acceleration = value;
        }

        update(context: FrameUpdateContext) : void {
            super.update(context);

            this._velocity = this._velocity.add(this._acceleration);
            this._position = this._position.add(this._velocity.scale(context.delta));
        }
    }
}