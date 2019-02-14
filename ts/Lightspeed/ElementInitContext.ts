/// <reference path="SceneContext.ts" />

namespace Lightspeed {
    export class ElementInitContext extends SceneContext{
        private _canvasBox: Box;
        private _engine: Engine;

        constructor(engine: Engine, scene: Scene) {
            super(scene);

            this._engine = engine;
            this._canvasBox = engine.canvas.box;
        }

        public get engine(): Engine {
            return this._engine;
        }

        public get canvasBox() {
            return this._canvasBox;
        }
    }
}