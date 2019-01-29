namespace Megaparsec {
    export class Controller {
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