/// <reference path="SceneContext.ts" />

namespace Lightspeed {
    export class FrameUpdateContext extends SceneContext {
        private _canvasBox: Box;

        private _elapsed: number;
        private _delta: number;

        public currentElement :Element;

        public get elapsed() {
            return this._elapsed;
        }

        public get delta() {
            return this._delta;
        }

        public get canvasBox() :Box {
            return this._canvasBox;
        }

        constructor(engine : Engine, scene : Scene, elapsed : number, fromPause? : boolean) {
            super(scene);

            this._canvasBox = engine.canvas.box;
            
            this._elapsed = elapsed;
            this._delta = this._elapsed / 1000;

            if (fromPause) {
                this._elapsed = 0;
                this._delta = 0;
            }
        }
    }
}

