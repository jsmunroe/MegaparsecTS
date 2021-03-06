namespace Megaparsec {
    export class Wave extends Lightspeed.Element {
        private _config: any;
        private _agents: Agent[] = [];
        private _activeAgents: Agent[] = [];

        private _level: number;

        private _waveCount: number;
        private _waveMode: WaveMode = WaveMode.OffsetWaveMode;
        private _delay: number = 1000.0; // 1 second.
        private _interval: number = 2000.0; // 2 seconds; 

        private _isFirstUpdate: boolean = true;

        constructor(config: any, level: number) {
            super();

            this._config = config;

            this._level = level || 1;

            this._waveCount = config.waveCount;
            this._waveMode = WaveMode[<string>config.waveMode];
            this._delay = config.delay || this._delay;
            this._interval = config.interval || this._interval;

            if (config.levelBasedInterval && config.levelBasedInterval.length) {
                this._interval = config.levelBasedInterval[Math.min(config.levelBasedInterval.length - 1, this._level)];
            }
        }

        init(context: Lightspeed.ElementInitContext): void {
            var controllers: Controller[] = this._config.controllers.map(i => ControllerFactory.current.create(i, this._level));

            var horizontalConstraintTopology : ConstraintToplogy = ConstraintToplogy[<string>this._config.horizontalConstraintTopology];
            var verticalConstraintTopology : ConstraintToplogy = ConstraintToplogy[<string>this._config.verticalConstraintTopology];
            
            var constrainer = new Constrainer(horizontalConstraintTopology, verticalConstraintTopology);

            var waveCount = this._waveCount || this._config.images.length;
            
            for (let i = 0; i < waveCount; i++) {
                var image = this._config.images[i % this._config.images.length];

                var width = this._config.width;
                var height = this._config.height;
                var frameCount = this._config.frameCount;

                var scale = 1;
                if (width && height && this._config.scaleRange) {
                    scale = this._config.scaleRange[0] + Random.Current.next(this._config.scaleRange[1] - this._config.scaleRange[0]);
                    width *= scale;
                    height *= scale;
                }

                var sprite = new Lightspeed.Sprite(image, width, height, frameCount);

                var controller: Controller = Random.Current.pick(controllers);

                var sheild :Sheild;

                if (this._level > 1) {
                    if (this._config.sheildType === 'Time') {
                        sheild = new TimeSheild((this._level - 1) * 2000);
                    } else if (this._config.sheildType === 'Energy') {
                        sheild = new EnergySheild(this._level - 1);
                    }
                }
            
                var agent: Agent = new Enemy(controller, constrainer, sprite, sheild);

                this._agents.push(agent);
            }
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
                context.pushElement(newAgent);
                this._activeAgents.push(newAgent);
            }
        }

        private updateOffset(context: Lightspeed.FrameUpdateContext): void {
            if (this._isFirstUpdate) {
                context.requestTimeout(this._delay, this, this.udpateOffsetTimeout);
            }
        }

        private udpateOffsetTimeout(context: Lightspeed.FrameUpdateContext): void {
            // Get agents not in the active agents list.
            var agentsLeft = this._agents.filter(i => this._activeAgents.indexOf(i) === -1);

            if (agentsLeft.length) {
                var newAgent = agentsLeft[0];
                context.pushElement(newAgent);
                this._activeAgents.push(newAgent);  
            }

            if (agentsLeft.length > 1) {
                context.requestTimeout(this._interval, this, this.udpateOffsetTimeout);
            }
        }

        private updateInstant(context: Lightspeed.FrameUpdateContext): void {
            if (this._isFirstUpdate) {
                for (let i = 0; i < this._agents.length; i++) {
                    const agent = this._agents[i];

                    context.pushElement(agent);
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