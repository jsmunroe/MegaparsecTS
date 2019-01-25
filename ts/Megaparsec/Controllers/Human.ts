namespace Megaparsec {
    export class Human extends Controller {
        private _maximumVelocity: number = 500;
        private _movementAcceleration: number = 50;

        constructor() {
            super();
        }

        updateAgent(agent: Agent, constraintBox: Lightspeed.Box) {
            var keys = Config.keys;

            var accelerationX: number = 0;
            var accelerationY: number = 0;

            if (Utils.keyboard.keys(keys.moveUp)) {
                if (agent.velocity.magnitude < this._maximumVelocity) {
                    accelerationY = -this._movementAcceleration;
                } 
            }

            if (Utils.keyboard.keys(keys.moveDown)) {
                if (agent.velocity.magnitude < this._maximumVelocity) {
                    accelerationY += this._movementAcceleration;
                }
            }

            if (Utils.keyboard.keys(keys.moveLeft)) {
                if (agent.velocity.magnitude < this._maximumVelocity) {
                    accelerationX = -this._movementAcceleration;
                }
            }

            if (Utils.keyboard.keys(keys.moveRight)) {
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
        }
    }
}