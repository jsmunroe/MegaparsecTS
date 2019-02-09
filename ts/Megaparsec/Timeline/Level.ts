namespace Megaparsec {
    export class Level extends Lightspeed.Element {
        private _waves: Wave[] = [];

        private _currentWave: Wave;

        constructor(waves: Wave[]) {
            super();

            this._waves = waves;
        }

        update(context: Lightspeed.FrameUpdateContext): void {
            if (!this._currentWave || this._currentWave.isDead) {
                if (!this._waves.length) {
                    this.kill();
                    return;
                }

                var nextWave = this._waves.shift();
                context.activate(nextWave);
                this._currentWave = nextWave;
            }
        }
    }

    export class LevelBuilder {

        private _waves: Wave[] = [];

        static start() : LevelBuilder {
            return new LevelBuilder();
        }

        pushWave(enemyName: string, difficulty: number) : LevelBuilder {
            if (!Config.agents[enemyName]) {
                return this;
            }

            var enemyConfig = Config.agents[enemyName];

            var wave = new Wave(enemyConfig);

            this._waves.push(wave);

            return this;
        }

        build() :Level {
            return new Level(this._waves);
        }
    }
}
