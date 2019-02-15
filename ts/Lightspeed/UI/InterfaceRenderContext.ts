namespace Lightspeed.UI {
    export class InterfaceRenderContext {
        private _parent: UiElement;
        private _frameRenderContext: FrameRenderContext;
        private _regionBox: Box;

        public get parent() {
            return this._parent;
        }

        public get ctx() {
            return this._frameRenderContext.ctx;
        }

        public get regionBox() {
            return this._regionBox;
        }

        constructor(parent: UiElement, frameRenderContext: FrameRenderContext, regionBox?: Box) {
            this._parent = parent;
            this._frameRenderContext = frameRenderContext;
            this._regionBox = regionBox || new Box(0, 0, frameRenderContext.canvasWidth, frameRenderContext.canvasHeight);
        }
    }
}