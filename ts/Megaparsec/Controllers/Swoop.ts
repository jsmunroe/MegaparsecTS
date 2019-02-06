namespace Megaparsec {
    export class Swoop extends Controller {

        init(agent: Agent, constraintBox: Lightspeed.Box) {
            var properties = agent.controllerProperties;

            properties.constrain = false;
            properties.phase = 0; // swooping

            var zoneLeft = constraintBox.width * 0.7;
            var zoneWidth = constraintBox.width - zoneLeft;

            agent.position = new Lightspeed.Vector(
                zoneLeft + Utils.random.next(zoneWidth),
                -agent.height * 2.0
            );

            var zoneHeight = constraintBox.height * 0.7;
            var zoneTop = (constraintBox.height - zoneHeight) / 2.0;
            properties.initialY = agent.position.y;
            properties.targetY = zoneTop + Utils.random.next(zoneHeight);

            properties.initialVelocity = new Lightspeed.Vector(0, 400);
            properties.targetVelocity = new Lightspeed.Vector(-300, 0);

            agent.velocity = new Lightspeed.Vector(0, properties.initialVelocity.y);
        }

        updateAgent(agent: Agent, context: Lightspeed.FrameUpdateContext) {
            var properties = agent.controllerProperties;
            
            if (properties.phase === 0) // swooping
            {
                var percentToTarget = (agent.position.y - properties.initialY) / (properties.targetY - properties.initialY);
                agent.velocity = new Lightspeed.Vector(
                    percentToTarget * properties.targetVelocity.x,
                    (1 - percentToTarget) * properties.initialVelocity.y
                );

                if (Math.abs(agent.position.y - properties.targetY) < 1) {
                    properties.constrain = true;
                    properties.phase = 1; // cruising
                }
            }
        }
    }
}