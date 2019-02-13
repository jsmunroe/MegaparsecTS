namespace Lightspeed {
    export class Engine {
        private _canvas :Canvas;

        private _segments :Segment[] = [];
        private _currentSegment :Segment;

        get currentSegment() {
            return this._currentSegment;
        }

        constructor() {
            this._canvas = Canvas.find();

            this.setSegment('Default Segment');
        }

        setSegment(name: string) {
            var frame = this._segments.filter(i => i.name === name)[0];

            if (!frame) {
                frame = new Segment(this, name);
                this._segments.push(frame);
            }

            this._currentSegment = frame;
        }

        public clear() {
            this.currentSegment.clear();
        }

        public pushElement(element: Element) {
            this.currentSegment.pushElement(element);
        }

        public removeElement(element: Element) {
            this.currentSegment.removeElement(element);
        }

        public findElements(predicate?: (element: Element) => boolean) :Element[] {
            return this.currentSegment.findElements(predicate);
        }

        public findFirstElement(predicate?: (element: Element) => boolean) :Element {
            return this.currentSegment.findFirstElement(predicate);
        }

        public findClosestElement(position: Vector, predicate?: (element: Element) => boolean) :Element {
            return this.currentSegment.findClosestElement(position, predicate);
        }

        public get canvas() {
            return this._canvas;
        }

        public get isPaused() :boolean {
            return this.currentSegment.isPaused;
        }

        public pause() {
            this.currentSegment.pause();
        }

        public unpause() {
            this.currentSegment.unpause();
        }

        public togglePause() {
            this.currentSegment.togglePause();
        }

        public requestTimeout(delay: number, element: Element, action: (context: FrameUpdateContext) => void) {
            this.currentSegment.requestTimeout(delay, element, action);
        }

        private runFrame(timeStamp : DOMHighResTimeStamp) {
            requestAnimationFrame(this.runFrame.bind(this));

            // Update phase
            for (let i = 0; i < this._segments.length; i++) {
                const segment = this._segments[i];
                
                if (!segment.isPaused) {
                    var updateContext = new FrameUpdateContext(this, timeStamp, segment.wasPaused);

                    segment.update(updateContext);
                }

            }

            // Render phase
            var ctx = this.canvas.startRender();
            var renderContext = new FrameRenderContext(this, timeStamp, ctx);

            this.currentSegment.render(renderContext);

            this.canvas.endRender(ctx);
        }

        public run() {
            requestAnimationFrame(this.runFrame.bind(this));
        }
    }

}
