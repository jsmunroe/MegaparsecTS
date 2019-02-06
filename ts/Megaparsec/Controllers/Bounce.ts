/// <reference path="Controller.ts" />

namespace Megaparsec {
    export class Bounce extends Controller {
        private _bounceDistance = 100;
        private _bounceJolt = 400;


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

            var zoneHeight = (constraintBox.height - this._bounceDistance) * 0.7;
            var zoneTop = (constraintBox.height - zoneHeight) / 2.0;
            properties.initialY = agent.position.y;
            properties.targetY = zoneTop + Utils.random.next(zoneHeight);

            properties.initialVelocity = new Vector(-150, 400);
            properties.targetVelocity = new Vector(-300, 0);

            agent.velocity = properties.initialVelocity;
        }

        updateAgent(agent: Agent, context: Lightspeed.FrameUpdateContext) {
            var properties = agent.controllerProperties;
            
            if (properties.phase === 0) // swooping
            {
                if (agent.position.y > (properties.targetY + this._bounceDistance)) {

                    agent.velocity = properties.targetVelocity.with(
                        x => x - this._bounceJolt, 
                        y => -this._bounceJolt);

                    properties.positionAfterPhase0 = agent.position;
                    properties.velocityAfterPhase0 = agent.velocity;

                    properties.phase = 1;
                }
            }
            if (properties.phase === 1) // bouncing
            {
                var percentToTarget = (agent.position.y - properties.targetY) / (properties.positionAfterPhase0.y - properties.targetY);
                agent.velocity = new Vector(
                    properties.targetVelocity.x + (-this._bounceJolt * percentToTarget),
                    percentToTarget * properties.velocityAfterPhase0.y
                );

                if (Math.abs(agent.position.y - properties.targetY) < 1) {
                    properties.constrain = true;
                    properties.phase = 2; // cruising
                }
            }
        }
    }
}