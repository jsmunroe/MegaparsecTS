namespace Megaparsec {
    export class Target extends Controller {
        private _lateralVelocity: number = 50;

        private _forwardVelocity: number = 200;
        private _forwardStep: number = 50;

        private _shotSpeed: number = 1200;
        private _shotIteration: number = 500;


        init(agent: Agent, constraintBox: Lightspeed.Box) {
            var properties = agent.controllerProperties;

            properties.constrain = false;
            properties.phase = 0; // moving forward
            properties.lastFireElapsed = 0;
            properties.targetX = constraintBox.width - 50;

            var zoneTop = constraintBox.height * 0.15;
            var zoneHeight = constraintBox.height - zoneTop * 2;

            agent.position = new Vector(
                constraintBox.width + 100,
                zoneTop + Utils.random.next(zoneHeight)
            );


            agent.velocity = new Vector(-200, 0);
        }

        updateAgent(agent: Agent, context: Lightspeed.FrameUpdateContext) {
            var properties = agent.controllerProperties;
            
            if (properties.phase === 0) { // moving forward
            
                if (agent.position.x < properties.targetX) {
                    agent.velocity = agent.velocity.withX(x => 0);
                    properties.phase = 1; // targetting
                    return;
                }
            }

            if (properties.phase === 1) { // targetting 
            
                var target :Player = <Player>context.findFirst(i => i instanceof Player);

                if (!target || target.isDead) {
                    agent.velocity = new Vector();
                    return;
                }

                properties.lastFireElapsed += context.elapsed;
                if (Math.abs(agent.position.y - target.position.y) < 5 ||
                    agent.position.y <= target.position.y && agent.velocity.y < 0 ||
                    agent.position.y >= target.position.y && agent.velocity.y > 0) {

                    if (properties.lastFireElapsed > this._shotIteration) {
                        context.activate(new Shot(agent, new Lightspeed.Vector(-this._shotSpeed)));
                        properties.lastFireElapsed = 0;

                        agent.velocity = new Vector(-this._forwardVelocity, 0);
                        properties.targetX = agent.position.x - this._forwardStep;
                        properties.phase = 0; // moving forward

                        return;
                    }

                    agent.velocity = new Vector();
                    return;
                } 

                if (agent.position.y < target.position.y) {
                    agent.velocity = new Vector(0, this._lateralVelocity);
                    return;
                }

                if (agent.position.y > target.position.y) {
                    agent.velocity = new Vector(0, -this._lateralVelocity);
                    return;
                }
            }
        }
    }
}