namespace Megaparsec {
    export class Wobble extends Controller {
        private _amplitude: number = 50;

        constructor(config: any, level: number) {
            super(level);

        }

        init(agent: Agent, constraintBox: Lightspeed.Box) {
            var properties = agent.controllerProperties;

            properties.constrain = false;
            properties.phase = 'swooping';

            var zoneLeft = constraintBox.width * 0.7;
            var zoneWidth = constraintBox.width - zoneLeft;

            agent.position = new Vector(
                zoneLeft + Random.Current.next(zoneWidth),
                -agent.height * 2.0
            );

            var zoneHeight = constraintBox.height * 0.7;
            var zoneTop = (constraintBox.height - zoneHeight) / 2.0;
            properties.initialY = agent.position.y;
            properties.targetY = zoneTop + Random.Current.next(zoneHeight);

            properties.initialVelocity = new Vector(0, 400);
            properties.targetVelocity = new Vector(-300, 0);

            agent.velocity = new Vector(0, properties.initialVelocity.y);
        }

        updateAgent(agent: Agent, context: Lightspeed.FrameUpdateContext) {
            var properties = agent.controllerProperties;
            
            if (properties.phase === 'swooping') {
            
                var percentToTarget = (agent.position.y - properties.initialY) / ((properties.targetY + this._amplitude) - properties.initialY);
                agent.velocity = agent.velocity.withX(x => percentToTarget * properties.targetVelocity.x);

                if (agent.position.y > properties.targetY + this._amplitude) {
                    agent.acceleration = new Vector(0, -this._amplitude);

                    properties.isWobblingDown = true;
                    properties.amplitudeFactor = 1;
                    properties.phase = 'wobble';
                }

                return;

            } 
            
            if (properties.phase === 'wobble') {

                if (agent.position.y < properties.targetY && !properties.isWobblingDown) {
                    agent.velocity = agent.velocity.withY(y => y * 0.75)
                    agent.acceleration = new Vector(0, this._amplitude);
                    properties.isWobblingDown = true;
                }

                if (agent.position.y >= properties.targetY && properties.isWobblingDown) {
                    agent.velocity = agent.velocity.withY(y => y * 0.75)
                    agent.acceleration = new Vector(0, -this._amplitude);
                    properties.isWobblingDown = false;
                }

                if (Math.abs(agent.velocity.y) < 50 && Math.abs(agent.position.y - properties.targetY) < 5) {
                    if (agent.velocity.y > 0) {
                        agent.acceleration = new Vector(1, -0.5);
                    } else {
                        agent.acceleration = new Vector(1, 0.5);
                    }
                    properties.phase = 'accelerating';
                    properties.constrain = true;
                }

                return;
            } 
            
            if (properties.phase === 'accelerating') {
                if ((agent.acceleration.y > 0 && agent.velocity.y > 0) ||
                    (agent.acceleration.y <= 0 && agent.velocity.y <= 0)) {
                        agent.velocity = agent.velocity.withY(y => 0);
                        agent.acceleration = agent.acceleration.withY(y => 0);
                    }

                if (agent.velocity.x > -this._maximumVelocityX) {
                    agent.acceleration = agent.acceleration.withX(x => 0);
                    agent.velocity = agent.velocity.withX(x => -this._maximumVelocityX);
                }

                if (!agent.acceleration.x && !agent.acceleration.y) {
                    properties.phase = 'cruising' // cruising
                }

                return;
            }

            super.cruise(agent, context);
        }
    }
}