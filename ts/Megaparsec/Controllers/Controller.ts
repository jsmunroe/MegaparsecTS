namespace Megaparsec {
    export class Controller {
        init(agent: Agent, constraintBox: Lightspeed.Box) {
            agent.controllerProperties.constrain = true;

            // optionally overloaded by extending classes to set given agents initial position.
        }

        update(agent: Agent, constraintBox: Lightspeed.Box) {
            this.updateAgent(agent, constraintBox);
            this.constrain(agent, constraintBox);
        }

        updateAgent(agent: Agent, constraintBox: Lightspeed.Box) {
            // optionally overloaded by extending classes to update the given agent.
        }

        constrain(agent: Agent, constraintBox: Lightspeed.Box) :boolean {
            if (constraintBox.contains(agent.box) || !agent.controllerProperties.constrain) {
                return true;
            }

            if (agent.horizontalConstraintTopology == AgentConstraintToplogy.Block) {
                if (agent.box.left < constraintBox.left) {
                    agent.box = agent.box.alignLeft(constraintBox.left);
                }

                if (agent.box.right > constraintBox.right) {
                    agent.box = agent.box.alignRight(constraintBox.right);
                }

                agent.acceleration = new Lightspeed.Vector(0, agent.acceleration.y);
                agent.velocity = new Lightspeed.Vector(0, agent.velocity.y);
            }

            if (agent.horizontalConstraintTopology == AgentConstraintToplogy.Wrap) {
                if (agent.box.right < constraintBox.left && agent.velocity.x <= 0) {
                    agent.box = agent.box.alignLeft(constraintBox.right).offset(agent.box.width * 2, 0);
                }
                
                if (agent.box.left > constraintBox.right && agent.velocity.x >= 0) {
                    agent.box = agent.box.alignRight(constraintBox.left).offset(-agent.box.width * 2, 0);
                }
            }

            if (agent.verticalConstraintTopology == AgentConstraintToplogy.Block) {
                if (agent.box.top < constraintBox.top) {
                    agent.box = agent.box.alignTop(constraintBox.top);
                }

                if (agent.box.bottom > constraintBox.bottom) {
                    agent.box = agent.box.alignBottom(constraintBox.bottom);
                }

                agent.acceleration = new Lightspeed.Vector(agent.acceleration.x, 0);
                agent.velocity = new Lightspeed.Vector(agent.velocity.x, 0);
           }

            if (agent.verticalConstraintTopology == AgentConstraintToplogy.Wrap) {
                if (agent.box.bottom < constraintBox.top && agent.velocity.y >= 0) {
                    agent.box = agent.box.alignTop(constraintBox.bottom).offset(0, agent.box.height * 2);
                }
                else if (agent.box.top > constraintBox.bottom && agent.velocity.y <= 0) {
                    agent.box = agent.box.alignBottom(constraintBox.top).offset(0, -agent.box.height * 2);;
                }
            }

            return false;
        }
    }
}