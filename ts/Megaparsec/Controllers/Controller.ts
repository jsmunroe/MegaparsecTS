namespace Megaparsec {
    export class Controller {
        private _level: number = 1;
        protected _maximumVelocityX: number = 200;

        public get level() {
            return this._level;
        }

        constructor(level: number) {
            this._level = level;
            this._maximumVelocityX = 200 + 10 * (level - 1);
        }

        init(agent: Agent, constraintBox: Lightspeed.Box) {
            agent.controllerProperties.constrain = true;


            // optionally overloaded by extending classes to set given agents initial position.
        }

        update(agent: Agent, context: Lightspeed.FrameUpdateContext) {
            this.updateAgent(agent, context);
        }

        updateAgent(agent: Agent, context: Lightspeed.FrameUpdateContext) {
            // optionally overloaded by extending classes to update the given agent.
        }
    }
}