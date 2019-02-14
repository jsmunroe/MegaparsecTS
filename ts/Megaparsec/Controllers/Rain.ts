namespace Megaparsec {
    export class Rain extends Controller {
        private _horizontalVelocityRange: number[] = [-50, 25];
        private _verticalVelocityRange: number[] = [150, 350];

        constructor(config: any, level: number) {
            super(level);

            this._horizontalVelocityRange = this._horizontalVelocityRange.map(v => v * (1 + Math.min(3, (level - 1) * 0.75)));
            this._verticalVelocityRange = this._verticalVelocityRange.map(v => v * (1 + Math.min(3, (level - 1) * 0.25)));
        }

        init(agent: Agent, constraintBox: Lightspeed.Box) {
            var properties = agent.controllerProperties;

            properties.constrain = false;
            properties.phase = 'raining';

            var zoneLeft = constraintBox.width * 0.1;
            var zoneWidth = constraintBox.width - zoneLeft;

            agent.position = new Lightspeed.Vector(
                zoneLeft + Random.Current.next(zoneWidth),
                -100
            );

            agent.velocity = new Lightspeed.Vector(
                Random.Current.getBetween(
                    this._horizontalVelocityRange[0], 
                    this._horizontalVelocityRange[1]),
                Random.Current.getBetween(
                    this._verticalVelocityRange[0], 
                    this._verticalVelocityRange[1])
                );
        }

        updateAgent(agent: Agent, context: Lightspeed.FrameUpdateContext) {
            var properties = agent.controllerProperties;
            
            if (properties.phase === 'raining')
            {
                if (agent.position.y > context.canvasBox.height) {
                    agent.kill();
                    context.pushElement(new Explosion(agent, new Vector(-200, 0)));
                }
            }
        }
    }
}