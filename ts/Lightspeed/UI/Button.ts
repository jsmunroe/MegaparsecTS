/// <reference path="UiElement.ts" />
/// <reference path="ContentContainer.ts" />

namespace Lightspeed.UI {
    export class Button extends ContentContainer{
        content: UiElement;

        hilightColor: string = 'RGBA(255, 255, 255, 0.3)';

        private _isMouseOver: boolean = false;

        get isMouseOver() {
            return this._isMouseOver;
        }

        render(context: Lightspeed.UI.InterfaceRenderContext): void {
            var ctx = context.ctx;
            ctx.save();

            super.render(context);

            if (this._isMouseOver) {
                ctx.fillStyle = this.hilightColor;
                super.drawBox(context);
            }

            this.content.render(context);
            
            ctx.restore();        
        }

        hitTest(mouseLocation: Vector) :UiElement {
            return this;
        }

        onMouseDown(mouseLocation: Vector): void {
            
        }

        onMouseEnter(mouseLocation: Vector): void {
            this._isMouseOver = true;
        }

        onMouseLeave(mouseLocation: Vector): void {
            this._isMouseOver = false;
        }

    }
}