namespace Megaparsec {
    export class FlowContainer {
        private _game: Game;
        private _elements: FlowElement[] = [];
        private _elementsByName: Object = {};

        get game() {
            return this._game;
        }

        constructor(game: Game) {
            this._game = game;
        }

        add(element: FlowElement) :FlowContainer {
            this._elements.push(element);
            this._elementsByName[element.name] = element;

            element.init(this);

            return this;
        }

        load(name: string, reset?: boolean) {
            var element = this._elementsByName[name];

            if (!element) {
                return;
            }

            if (reset) {
                element.reset(this._game);
            }

            element.load(this._game);
        }
    }

    export abstract class FlowElement {
        protected _container: FlowContainer;
        private _name: string;

        get name() {
            return this._name;
        }

        constructor(name: string) {
            this._name = name;
        }

        init(container: FlowContainer) {
            this._container = container;
        }

        abstract load(game: Game);

        reset(game: Game) { }
    }
}