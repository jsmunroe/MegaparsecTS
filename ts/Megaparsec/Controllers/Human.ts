namespace Megaparsec {
    export class Human extends Controller {
        private _maximumVelocity: number = 500;
        private _movementAcceleration: number = 50;

        constructor() {
            super();
        }

        update(agent: Agent, constraintBox: Lightspeed.Box) {
            var keys = Config.keys;

            var accelerationX: number = 0;
            var accelerationY: number = 0;

            if (Keyboard.Current.keys(keys.moveUp)) {
                if (agent.velocity.magnitude < this._maximumVelocity) {
                    accelerationY = -this._movementAcceleration;
                } 
            }

            if (Keyboard.Current.keys(keys.moveDown)) {
                if (agent.velocity.magnitude < this._maximumVelocity) {
                    accelerationY += this._movementAcceleration;
                }
            }

            if (Keyboard.Current.keys(keys.moveLeft)) {
                if (agent.velocity.magnitude < this._maximumVelocity) {
                    accelerationX = -this._movementAcceleration;
                }
            }

            if (Keyboard.Current.keys(keys.moveRight)) {
                if (agent.velocity.magnitude < this._maximumVelocity) {
                    accelerationX += this._movementAcceleration;
                }
            }

            if (!accelerationX && !accelerationY) {
                if (agent.velocity.magnitude < 30) {
                    agent.velocity = new Lightspeed.Vector();
                    agent.acceleration = new Lightspeed.Vector();
                } else {
                    agent.acceleration = agent.velocity.normal.scale(-this._movementAcceleration);
                }
            } else {
                agent.acceleration = new Lightspeed.Vector(accelerationX, accelerationY);
            }

            this.constrain(agent, constraintBox);
        }

        // ToDo: Create a Constraint class higherarchy.
        private constrain(agent: Agent, constraintBox: Lightspeed.Box) :boolean {
            if (constraintBox.contains(agent.box)) {
                return true;
            }

            if (agent.box.left < constraintBox.left) {
                agent.box = agent.box.alignLeft(constraintBox.left);
            }

            if (agent.box.right > constraintBox.right) {
                agent.box = agent.box.alignRight(constraintBox.right);
            }

            if (agent.box.top < constraintBox.top) {
                agent.box = agent.box.alignTop(constraintBox.top);
            }

            if (agent.box.bottom > constraintBox.bottom) {
                agent.box = agent.box.alignBottom(constraintBox.bottom);
            }

            agent.acceleration = new Lightspeed.Vector();
            agent.velocity = new Lightspeed.Vector();

            return false;
        }
    }
}