namespace Lightspeed {
    export class Engine {
        private _canvas : Canvas;

        private _elements : Element[] = [];

        constructor() {
            this._canvas = Canvas.find();
        }

        public clear() {
            this._elements = [];
        }

        public pushElement(element: Element) {
            this._elements.push(element);

            var initContext = new ElementInitContext(this.canvas);
            element.init(initContext);
        }

        public get canvas() {
            return this._canvas;
        }

        private runFrame(timeStamp : DOMHighResTimeStamp) {
            requestAnimationFrame(this.runFrame.bind(this));

            // Update phase
            var updateContext = new FrameUpdateContext(this, timeStamp);

            for (let i = 0; i < this._elements.length; i++) {
                const element = this._elements[i];
                
                element.update(updateContext);
            }

            // Render phase
            var ctx = this.canvas.startRender();
            var renderContext = new FrameRenderContext(this, ctx);

            for (let i = 0; i < this._elements.length; i++) {
                const element = this._elements[i];
                
                element.render(renderContext);
            }

            this.canvas.endRender(ctx);
        }

        public run() {
            requestAnimationFrame(this.runFrame.bind(this));
        }
    }

}
