namespace Megaparsec {
    export class Flank extends Controller {
        private _lateralVelocity: number = 50;

        private _forwardVelocity: number = 200;
        private _forwardStep: number = 50;

        private _shotSpeed: number = 1200;
        private _shotIteration: number = 500;

        constructor(config: any, level: number) {
            super(level);
        }

        init(agent: Agent, constraintBox: Lightspeed.Box) {
            var properties = agent.controllerProperties;

            properties.constrain = false;
            properties.phase = 0; // russing in

            var zoneTop = 0;
            var zoneHeight = constraintBox.height - 100;

            var zoneLeft = constraintBox.width * 0.5;
            var zoneWidth = constraintBox.width - zoneLeft;

            var targetY = zoneTop + Random.Current.next(zoneHeight);
            var targetX = zoneLeft + Random.Current.next(zoneWidth);

            properties.initial = new Vector(
                -100,
                targetY + 100,
            );

            agent.position = properties.initial;

            properties.target = new Vector(targetX, targetY);
            properties.initialVelocity = new Vector(800, 0);
            agent.velocity = properties.initialVelocity;
        }

        updateAgent(agent: Agent, context: Lightspeed.FrameUpdateContext) {
            var properties = agent.controllerProperties;
            
            if (properties.phase === 0) { // russing in
            
                var percentToTarget = (properties.target.x - agent.position.x) / (properties.target.x - properties.initial.x)
                agent.velocity = new Vector(
                    properties.initialVelocity.x * percentToTarget,
                    -50 * (1 - percentToTarget)
                );             

                if (agent.position.y <= properties.target.y) {
                    agent.velocity = agent.velocity.withY(y => 0);
                    agent.acceleration = new Vector(-10, 0);
                    properties.phase = 1; 
                    properties.constrain = true;
                }
            }

            if (properties.phase === 1) {
                if (agent.velocity.x <= -200) {
                    agent.acceleration = new Vector(-0.1, 0);
                    properties.phase = 2; // cruising
                    properties.constrain = true;
                }                
            }

            if (properties.phase === 2) { // accelerating 
                if (agent.velocity.x <= -this._maximumVelocityX) {
                    agent.velocity = new Vector(-this._maximumVelocityX, 0);
                    agent.acceleration = new Vector();
                    properties.phase = 3; // cruising
                }                
            }
        }
    }
}
