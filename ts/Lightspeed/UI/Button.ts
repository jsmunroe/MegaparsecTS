/// <reference path="UiElement.ts" />
/// <reference path="ContentContainer.ts" />

namespace Lightspeed.UI {
    export class Button extends ContentContainer{
        content: UiElement;

        hilightColor: string = 'RGBA(255, 255, 255, 0.3)';

        isEnabled: boolean = true;

        private _isMouseOver: boolean = false;

        get isMouseOver() {
            return this._isMouseOver;
        }

        render(context: Lightspeed.UI.InterfaceRenderContext): void {
            var ctx = context.ctx;
            ctx.save();

            if (!this.isEnabled) {
                ctx.globalAlpha = 0.3;
            }

            super.render(context);

            if (this._isMouseOver && this.isEnabled) {
                ctx.fillStyle = this.hilightColor;
                super.drawElementBackground(context);
            }

            this.content.render(context);
            
            ctx.restore();        
        }

        addText(text: string) :Button {
            this.add(Lightspeed.UI.TextElement, r => {
                r.text = text
            })

            return this;
        }

        hitTest(mouseLocation: Vector) :UiElement {
            return this;
        }

        onMouseEnter(mouseLocation: Vector): void {
            this._isMouseOver = true;
            super.onMouseEnter(mouseLocation);
        }

        onMouseLeave(mouseLocation: Vector): void {
            this._isMouseOver = false;
            super.onMouseLeave(mouseLocation);
        }

    }
}