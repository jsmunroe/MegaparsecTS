namespace Megaparsec {
    export class Wave extends Lightspeed.Element {
        private _config: any;
        private _agents: Enemy[] = [];

        constructor(config: any) {
            super()

            this._config = config;
        }

        init(context: Lightspeed.ElementInitContext) : void {
            var controllers: Controller[] = this._config.controllers.map(i => ControllerFactory.current.create(i));

            this._config.images.forEach(i => {
                var controller: Controller = Random.pick(controllers);
                var agent = new Enemy(controller, i);
                this._agents.push(agent);
            });
        }

        update(context: Lightspeed.FrameUpdateContext): void {
            
        }
    }
}