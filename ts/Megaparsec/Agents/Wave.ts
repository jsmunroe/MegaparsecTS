namespace Megaparsec {
    export class Wave extends Lightspeed.Element {
        private _config: any;
        private _agents: Agent[] = [];
        private _activeAgents: Agent[] = [];

        private _waveMode: WaveMode = WaveMode.OffsetWaveMode;
        private _delay: number = 1000.0; // 1 second.
        private _interval: number = 2000.0; // 2 seconds; 

        private _isFirstUpdate: boolean = true;

        constructor(config: any) {
            super();

            this._config = config;

            this._waveMode = WaveMode[<string>config.waveMode];
            this._delay = config.delay || this._delay;
            this._interval = config.interval || this._interval;
        }

        init(context: Lightspeed.ElementInitContext): void {
            var controllers: Controller[] = this._config.controllers.map(i => ControllerFactory.current.create(i));

            var horizontalConstraintTopology : ConstraintToplogy = ConstraintToplogy[<string>this._config.horizontalConstraintTopology];
            var verticalConstraintTopology : ConstraintToplogy = ConstraintToplogy[<string>this._config.verticalConstraintTopology];
            
            var constrainer = new Constrainer(horizontalConstraintTopology, verticalConstraintTopology);

            this._config.images.forEach(i => {
                var controller: Controller = Utils.random.pick(controllers);
                
                var agent: Agent = new Enemy(controller, constrainer, i);

                this._agents.push(agent);
            });
        }

        update(context: Lightspeed.FrameUpdateContext): void {
            // Purge dead agents.
            this._agents = this._agents.filter(i => !i.isDead);
            this._activeAgents = this._activeAgents.filter(i => !i.isDead);

            if (!this._agents.length) {
                this.kill();
                return;
            }

            if (this._waveMode == WaveMode.OffsetWaveMode) {
                this.updateOffset(context);
            } else if (this._waveMode == WaveMode.InstantWaveMode) {
                this.updateInstant(context);
            } else {
                this.updateSerial(context);
            }

            this._isFirstUpdate = false;
        }

        private updateSerial(context: Lightspeed.FrameUpdateContext): void {
            if (!this._activeAgents.length) {
                var newAgent = this._agents[0];
                context.activate(newAgent);
                this._activeAgents.push(newAgent);
            }
        }

        private updateOffset(context: Lightspeed.FrameUpdateContext): void {
            if (this._isFirstUpdate) {
                context.delay(this._delay, this.udpateOffsetTimeout);
            }
        }

        private udpateOffsetTimeout(context: Lightspeed.FrameUpdateContext): void {
            // Get agents not in the active agents list.
            var agentsLeft = this._agents.filter(i => this._activeAgents.indexOf(i) === -1);

            if (agentsLeft.length) {
                var newAgent = agentsLeft[0];
                context.activate(newAgent);
                this._activeAgents.push(newAgent);  
            }

            if (agentsLeft.length > 1) {
                context.delay(this._interval, this.udpateOffsetTimeout);
            }
        }

        private updateInstant(context: Lightspeed.FrameUpdateContext): void {
            if (this._isFirstUpdate) {
                for (let i = 0; i < this._agents.length; i++) {
                    const agent = this._agents[i];

                    context.activate(agent);
                    this._activeAgents.push(agent);                          
                }
            }
        }
    }

    export enum WaveMode {
        SerialWaveMode = 1, // One agent released at a time
        OffsetWaveMode = 2, // Agents at intervals
        InstantWaveMode = 3 // All agents released at once
    }
}