/// <reference path="SceneContext.ts" />

namespace Lightspeed {
    export class ElementCollisionContext extends SceneContext {
        _engine: Engine;
        _otherElement: Element;

        public get otherElement() {
            return this._otherElement;
        }

        constructor(engine : Engine, scene : Scene, otherElement :Element) {
            super(scene);

            this._engine = engine;
            this._otherElement = otherElement;
        }
    }
}