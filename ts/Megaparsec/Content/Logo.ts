namespace Megaparsec {
    export class Logo extends Lightspeed.Element {
        private _logoFlow: LogoFlow;
        private _logo: Lightspeed.Sprite;

        constructor(logoFlow: LogoFlow) {
            super();

            this.zIndex = 100;

            this._logoFlow = logoFlow;
            this._logo = new Lightspeed.Sprite(Config.branding.logoImagePath, 300, 250);
        }

        init(context: Lightspeed.ElementInitContext): void {
            context.requestTimeout(Config.branding.logoDuration, this, context => this._logoFlow.startGame());
        }

        render(context: Lightspeed.FrameRenderContext): void {
            var canvasBox = new Box(0, 0, context.canvasWidth, context.canvasHeight);
            this._logo.draw(context.ctx, canvasBox.center);
        }
    }
}