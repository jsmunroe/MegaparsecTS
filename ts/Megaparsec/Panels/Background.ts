namespace Megaparsec {
    export class Background extends Lightspeed.Element {

        constructor() {
            super();

            this.zIndex = -1100;
        }

        render(context: Lightspeed.FrameRenderContext) {
            context.ctx.fillRect(0, 0, context.canvasWidth, context.canvasHeight);
        }
    }
}