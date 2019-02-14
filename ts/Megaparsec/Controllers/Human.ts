namespace Megaparsec {
    export class Human extends Controller {
        private _maximumVelocity: number = 500;
        private _movementAcceleration: number = 50;

        constructor() {
            super(1);
        }

        updateAgent(agent: Agent, context: Lightspeed.FrameUpdateContext) {
            var properties = agent.controllerProperties;

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

            properties.lastFireElapsed += context.elapsed;
            if (Keyboard.Current.keys(keys.primaryFire)) {
                if (!properties.lastFireElapsed || properties.lastFireElapsed > 400) {
                    context.pushElement(new Shot(agent, new Lightspeed.Vector(800)));
                    properties.lastFireElapsed = 0;
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