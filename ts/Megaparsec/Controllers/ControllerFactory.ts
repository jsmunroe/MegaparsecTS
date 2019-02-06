/// <reference path="Swoop.ts" />
/// <reference path="Bounce.ts" />
/// <reference path="Loop.ts" />
/// <reference path="Wobble.ts" />

namespace Megaparsec {

    export class ControllerFactory {
        private static _current: ControllerFactory = new ControllerFactory();

        private _controllerTypesByName = {};

        constructor() {
            this.registerControllers();
        }

        private registerControllers() {
            this._controllerTypesByName['Player'] = Player;
            this._controllerTypesByName['Swoop'] = Megaparsec.Swoop;
            this._controllerTypesByName['Bounce'] = Megaparsec.Bounce;
            this._controllerTypesByName['Loop'] = Megaparsec.Loop;
            this._controllerTypesByName['Wobble'] = Megaparsec.Wobble;
            this._controllerTypesByName['Target'] = Megaparsec.Swoop;
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