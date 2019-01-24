namespace Megaparsec {
    export class Controller {
        init(agent: Agent, constraintBox: Lightspeed.Box) {
            // optionally overloaded by extending classes to set given agents initial position.
        }

        update(agent: Agent, constraintBox: Lightspeed.Box) {
            // optionally overloaded by extending classes to update the given agent.
        }
    }
}