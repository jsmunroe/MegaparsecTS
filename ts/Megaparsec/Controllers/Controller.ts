namespace Megaparsec {
    export class Controller {
        private _level: number = 1;
        protected _maximumVelocityX: number = 200;

        public get level() {
            return this._level;
        }

        constructor(level: number) {
            this._level = level;
            this._maximumVelocityX = Math.min(500, 200 + 10 * (level - 1));
        }

        init(agent: Agent, constraintBox: Lightspeed.Box) {
            agent.controllerProperties.constrain = true;

            // optionally overloaded by extending classes to set given agents initial position.
        }

        update(agent: Agent, context: Lightspeed.FrameUpdateContext) {
            this.updateAgent(agent, context);
        }

        updateAgent(agent: Agent, context: Lightspeed.FrameUpdateContext) {

        }

        cruise(agent: Agent, context: Lightspeed.FrameUpdateContext) {
            var properties = agent.controllerProperties;
            properties.constraint = true;


            if (!properties.cruiseVelocity) {
                properties.cruiseVelocity = agent.velocity;
            }

            var drift = 0.2;

            agent.acceleration = new Vector(
                -drift + Random.Current.next(drift * 2),
                -drift + Random.Current.next(drift * 2)
            )
        }
    }
}