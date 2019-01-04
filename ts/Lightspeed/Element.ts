namespace Lightspeed {
    export class Element {
        private _canvasWidth: number;
        private _canvasHeight: number;

        init(context: ElementInitContext) : void {
            // optionally overloaded by extending classes set the initial state of this element.
        }

        update(context: FrameUpdateContext): void {
            // optionally overloaded by extending classes to update element state per frame time.
        }

        render(context: FrameRenderContext): void {
            // optionally overloaded by extending classes to render element.
        }
    }
}