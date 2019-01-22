namespace Lightspeed {
    export class Engine {
        private _canvas : Canvas;

        private _elements : Element[] = [];

        private _isPaused : boolean = false;
        private _wasPaused : boolean = false;

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

        public removeElement(element: Element) {
            var index = this._elements.indexOf(element);

            if (index !== -1) {
                this._elements.splice(index, 1);
            }
        }

        public get canvas() {
            return this._canvas;
        }

        public get isPaused() {
            return this._isPaused;
        }

        public pause() {
            this._isPaused = true;
            this._wasPaused = true;
        }

        public unpause() {
            this._isPaused = false;
        }

        public togglePause() {
            if (this._isPaused) {
                this.unpause();
            } else {
                this.pause();
            }
        }

        private runFrame(timeStamp : DOMHighResTimeStamp) {
            requestAnimationFrame(this.runFrame.bind(this));

            if (!this._isPaused) {
                // Update phase
                var updateContext = new FrameUpdateContext(this, timeStamp, this._wasPaused);

                this._wasPaused = false;

                for (let i = 0; i < this._elements.length; i++) {
                    const element = this._elements[i];
                    
                    element.update(updateContext);
                }
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
