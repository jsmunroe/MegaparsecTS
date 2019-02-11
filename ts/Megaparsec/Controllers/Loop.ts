/// <reference path="Controller.ts" />

namespace Megaparsec {
    export class Loop extends Controller {
        private _loopRadius = 75;

        constructor(config: any, level: number) {
            super(level);
        }

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

                return;
            }

            if (properties.phase === 1) // looping
            {
                var velocity = agent.velocity.magnitude;
                var angleToLoopCenter = agent.position.angleTo(properties.loopCenter);
                var tangentAngle = angleToLoopCenter + Math.PI * 0.5;
            
                agent.velocity = Vector.fromPolar(tangentAngle, velocity);

                if (agent.velocity.x < 0 && Math.abs(agent.velocity.y) < 20) {
                    agent.velocity = new Vector(-agent.velocity.magnitude, 0);
                    if (agent.velocity.x > -this._maximumVelocityX) {
                        agent.acceleration = new Vector(-0.1, 0);
                        properties.phase = 2 // accelerating
                    } else {
                        agent.acceleration = new Vector(0.1, 0);
                        properties.phase = 3 // decelerating
                    }
                    properties.constrain = true;
                }

                return;
            }

            if (properties.phase === 2) { // accelerating 
                if (agent.velocity.x <= -this._maximumVelocityX) {
                    agent.velocity = agent.velocity.withX(x => -this._maximumVelocityX);
                    agent.acceleration = new Vector();
                    properties.phase = 4; // cruising           
                }

                return;
            }

            if (properties.phase === 3) { // decelerating 
                if (agent.velocity.x > -this._maximumVelocityX) {
                    agent.velocity = agent.velocity.withX(x => -this._maximumVelocityX);
                    agent.acceleration = new Vector();
                    properties.phase = 4; // cruising           
                }

                return;
            }
        }
    }
}