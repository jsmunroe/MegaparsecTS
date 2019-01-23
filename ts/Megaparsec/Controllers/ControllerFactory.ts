namespace Megaparsec {
    export class ControllerFactory {
        private static _current: ControllerFactory = new ControllerFactory();

        private _controllerTypesByName = {};

        constructor() {
            this.registerControllers();
        }

        private registerControllers() {
            this._controllerTypesByName['Player'] = Player;
        }

        public static get current() {
            return ControllerFactory._current;
        }

        public create(config: any) :Controller {
            if (!config.name || !this._controllerTypesByName[config.name]) {
                return new Controller();
            }
            
            var type = this._controllerTypesByName[config.name];

            return <Controller>new type(config);
        }
    }
}