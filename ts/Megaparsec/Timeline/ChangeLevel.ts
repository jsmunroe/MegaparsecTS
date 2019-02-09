namespace Megaparsec {
    export class ChangeLevel extends Lightspeed.Element {

        private _phaseNumber: number = 0;
        private _phases: Phase[] = [];
        private _elapsed: number = 0;

        private _hills: Hills;
        private _starField: StarField;

        private _nextLevelNumber: number;
        private _nextLevelMessage: Message;
        private _nextLevelColor: string;

        constructor(nextLevelNumber: number, nextLevelColor: string) {
            super();

            this._nextLevelNumber = nextLevelNumber;
            this._nextLevelMessage = new Message(`Level ${this._nextLevelNumber}`);
            this._nextLevelColor = nextLevelColor;
        }

        init(context: Lightspeed.ElementInitContext) : void {
            this._hills = context.engine.findFirstElement(i => i instanceof Hills) as Hills;
            this._starField = context.engine.findFirstElement(i => i instanceof StarField) as StarField;

            this._hills.acceleration = new Vector(-5, 1);

            this._phases = [
                Phase.when(context => this._elapsed > 500)
                    .do(context => {
                        this._starField.acceleration = new Vector(-5, 0);
                    }), 
                Phase.when(context => this._elapsed > 2000)
                    .do(context => {
                        this._hills.kill();
                    }), 
                Phase.when(context => this._elapsed > 6000)
                    .do(context => {
                        context.activate(this._nextLevelMessage);
                        this._starField.acceleration = new Vector(5, 0);
                    }),
                Phase.when(context => this._elapsed > 12000 || this._starField.velocity.x > 0)
                    .do(context => {
                        var hills = new Hills(this._nextLevelColor);
                        hills.position = this._hills.position;
                        hills.velocity = this._hills.velocity.withY(y => -y);
                        hills.acceleration = this._hills.acceleration.scale(-1);
    
                        context.activate(hills);
                        this._hills = hills;     
                    }),
                Phase.when(context => this._starField.velocity.x > 0)
                    .do(context => {
                        this._starField.acceleration = new Vector();
                        this._starField.velocity = new Vector(); 
                    }),
                Phase.when(context => this._hills.position.y <= 0)
                    .do(context => {
                        this._hills.velocity = this._hills.velocity.withY(y => 0);
                        this._hills.acceleration = this._hills.acceleration.withY(y => 0);
                    }),
                Phase.when(context => this._hills.velocity.x >= -200)
                    .do(context => {
                        this._hills.acceleration = new Vector();
                        this._nextLevelMessage.kill();
                    }),
            ];
        }

        update(context: Lightspeed.FrameUpdateContext): void {
            var phase = this._phases[this._phaseNumber];

            if (!phase) {
                this.kill();
                return;
            }

            this._elapsed += context.elapsed;

            if (phase.act(this, context)) {
                this._phaseNumber++;
            }
        }


    }

    class Phase {
        private _condition: (context: Lightspeed.FrameUpdateContext) => boolean;
        private _action: (context: Lightspeed.FrameUpdateContext) => void;

        static when(condition: (context: Lightspeed.FrameUpdateContext) => boolean) :Phase {
            var phase = new Phase();
            phase._condition = condition;
            return phase;
        }

        do(action: (context: Lightspeed.FrameUpdateContext) => void) :Phase {
            this._action = action;
            return this;
        }

        act(element: Lightspeed.Element, context: Lightspeed.FrameUpdateContext): boolean {
            if (!this._condition.bind(element)(context)) {
                return false;
            }

            this._action.bind(element)(context);
            return true;
        }
    }
}