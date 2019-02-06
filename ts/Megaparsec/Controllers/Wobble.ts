namespace Megaparsec {
    export class Wobble extends Controller {
        private _amplitude: number = 50;

        init(agent: Agent, constraintBox: Lightspeed.Box) {
            var properties = agent.controllerProperties;

            properties.constrain = false;
            properties.phase = 0; // swooping

            var zoneLeft = constraintBox.width * 0.7;
            var zoneWidth = constraintBox.width - zoneLeft;

            agent.position = new Vector(
                zoneLeft + Utils.random.next(zoneWidth),
                -agent.height * 2.0
            );

            var zoneHeight = constraintBox.height * 0.7;
            var zoneTop = (constraintBox.height - zoneHeight) / 2.0;
            properties.initialY = agent.position.y;
            properties.targetY = zoneTop + Utils.random.next(zoneHeight);

            properties.initialVelocity = new Vector(0, 400);
            properties.targetVelocity = new Vector(-300, 0);

            agent.velocity = new Vector(0, properties.initialVelocity.y);
        }

        updateAgent(agent: Agent, context: Lightspeed.FrameUpdateContext) {
            var properties = agent.controllerProperties;
            
            if (properties.phase === 0) { // swooping
            
                var percentToTarget = (agent.position.y - properties.initialY) / ((properties.targetY + this._amplitude) - properties.initialY);
                agent.velocity = agent.velocity.withX(x => percentToTarget * properties.targetVelocity.x);

                if (agent.position.y > properties.targetY + this._amplitude) {
                    agent.acceleration = new Vector(0, -this._amplitude);

                    properties.amplitudeFactor = 1;
                    properties.phase = 1;
                }

            } else if (properties.phase === 1) { // wobble up

                if (agent.position.y < properties.targetY) {
                    agent.velocity = agent.velocity.withY(y => y * 0.75)
                    agent.acceleration = new Vector(0, this._amplitude);

                    properties.phase = 2;

                    if (Math.abs(agent.velocity.y) < 150) {
                        agent.velocity = agent.velocity.withY(y => 0);
                        agent.acceleration = new Vector();
                        properties.phase = 3 // cruising
                        properties.constrain = true;
                    }
                }

            } else if (properties.phase === 2) { // wobble down

                if (agent.position.y > properties.targetY) {
                    agent.velocity = agent.velocity.withY(y => y * 0.75)
                    agent.acceleration = new Vector(0, -this._amplitude);

                    properties.phase = 1;

                    if (Math.abs(agent.velocity.y) < 150) {
                        agent.velocity = agent.velocity.withY(y => 0);
                        agent.acceleration = new Vector();
                        properties.phase = 3 // cruising
                        properties.constrain = true;
                    }
                }
            }
        }
    }
}