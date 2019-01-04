namespace Megaparsec {
    export class Background extends Lightspeed.Element {

        render(context: Lightspeed.FrameRenderContext) {
            context.ctx.fillRect(0, 0, context.canvasWidth, context.canvasHeight);
        }
    }
}