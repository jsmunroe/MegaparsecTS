/// <reference path="Controller.ts" />

namespace Megaparsec {
    export class Loop extends Controller {
        private _loopRadius = 75;

        init(agent: Agent, constraintBox: Lightspeed.Box) {
            var properties = agent.controllerProperties;

            properties.constrain = false;
            properties.phase = 0; // swooping

            var zoneLeft = constraintBox.width * 0.7;
            var zoneWidth = constraintBox.width - zoneLeft;

            agent.position = new Vector(
                zoneLeft + Random.Current.next(zoneWidth),
                -agent.height * 2.0
            );

            var zoneHeight = (constraintBox.height - this._loopRadius) * 0.7;
            var zoneTop = (constraintBox.height - zoneHeight) / 2.0;
            properties.initialY = agent.position.y;
            properties.targetY = zoneTop + Random.Current.next(zoneHeight);

            properties.initialVelocity = new Vector(-150, 400);
            properties.targetVelocity = new Vector(-300, 0);

            agent.velocity = properties.initialVelocity;
        }

        updateAgent(agent: Agent, context: Lightspeed.FrameUpdateContext) {
            var properties = agent.controllerProperties;
            
            if (properties.phase === 0) // swooping
            {
                if (agent.position.y > properties.targetY) {

                    properties.loopCenter = agent.position.withX(x => x + this._loopRadius);

                    properties.phase = 1;
                }
            }
            if (properties.phase === 1) // looping
            {
                var velocity = agent.velocity.magnitude;
                var angleToLoopCenter = agent.position.angleTo(properties.loopCenter);
                var tangentAngle = angleToLoopCenter + Math.PI * 0.5;
            
                agent.velocity = Vector.fromPolar(tangentAngle, velocity);

                if (agent.velocity.x < 0 && Math.abs(agent.velocity.y) < 20) {
                    agent.velocity = agent.velocity.withY(y => 0);

                    properties.phase = 2 // Cruising
                    properties.constrain = true;
                }
            }
        }
    }
}