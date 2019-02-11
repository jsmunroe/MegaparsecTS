namespace Megaparsec {
    export class Rain extends Controller {

        constructor(config: any, level: number) {
            super(level);
        }

        init(agent: Agent, constraintBox: Lightspeed.Box) {
            var properties = agent.controllerProperties;

            properties.constrain = false;
            properties.phase = 0; // raining

            var zoneLeft = constraintBox.width * 0.1;
            var zoneWidth = constraintBox.width - zoneLeft;

            agent.position = new Lightspeed.Vector(
                zoneLeft + Random.Current.next(zoneWidth),
                -100
            );

            agent.velocity = new Lightspeed.Vector(-50 - Random.Current.next(50), 150 + Random.Current.next(200));;
        }

        updateAgent(agent: Agent, context: Lightspeed.FrameUpdateContext) {
            var properties = agent.controllerProperties;
            
            if (properties.phase === 0) // raining
            {
                if (agent.position.y > context.canvasBox.height) {
                    agent.kill();
                    context.activate(new Explosion(agent, new Vector(-200, 0)));
                }
            }
        }

    }
}