namespace Megaparsec {
    export class Level extends Lightspeed.Element {
        private _waves: Wave[] = [];

        private _elements: Lightspeed.Element[] = [];

        private _currentWave: Wave;

        static start() : Level {
            return new Level();
        }

        addWave(enemyName: string, level: number) : Level {
            if (!Config.agents[enemyName]) {
                return this;
            }

            var enemyConfig = Config.agents[enemyName];

            var wave = new Wave(enemyConfig, level);

            this._waves.push(wave);

            return this;
        }

        addElement(element: Lightspeed.Element) : Level {
            this._elements.push(element);

            return this;
        }

        update(context: Lightspeed.FrameUpdateContext): void {
            if (!this._currentWave || this._currentWave.isDead) {
                if (!this._waves.length) {
                    this.kill();
                    this._elements.forEach(i => i.kill());
                    return;
                }

                var nextWave = this._waves.shift();
                context.activate(nextWave);
                this._currentWave = nextWave;
            }
        }
    }
}
