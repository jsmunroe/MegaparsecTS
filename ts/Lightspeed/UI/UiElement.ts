/// <reference path="../Utils/CtxHelpers.ts" />

import CtxHelpers = Lightspeed.Utils.CtxHelpers;

namespace Lightspeed.UI {
    export abstract class UiElement {
        backgroundColor: string = 'transparent'

        borderColor: string = null;
        borderThickness: number = 1;
        borderRadius: number = 15;

        horizontalAlignment: HorizontalAlignment = HorizontalAlignment.left;
        verticalAlignment: VerticalAlignment = VerticalAlignment.top;

        padding: Thickness = Thickness.all(5);
        margin: Thickness = Thickness.all(0);

        width: number = null;
        height: number = null;

        minWidth: number = null;
        maxWidth: number = null;

        minHeight: number = null;
        maxHeight: number = null;

        renderSize: Box;
        desiredSize: Size;

        private _mouseDownHandlers: ((mouseLocation: Vector) => void)[] = [];
        private _mouseMoveHandlers: ((mouseLocation: Vector) => void)[] = [];
        private _mouseEnterHandlers: ((mouseLocation: Vector) => void)[] = [];
        private _mouseLeaveHandlers: ((mouseLocation: Vector) => void)[] = [];

        render(context: Lightspeed.UI.InterfaceRenderContext): void {
            var ctx = context.ctx;
            ctx.save();

            ctx.fillStyle = this.backgroundColor;
            ctx.strokeStyle = 'transparent'
            
            if (this.borderColor && this.borderThickness) {
                ctx.strokeStyle = this.borderColor;
                ctx.lineWidth = this.borderThickness;
            }

            this.drawElementBackground(context);
            
            ctx.restore();
        }

        applyStyle(style: any) {
            var styleKeys = Object.keys(style);
            var localKeys = Object.keys(this);

            for (let i = 0; i < styleKeys.length; i++) {
                const styleKey = styleKeys[i];
                
                if (localKeys.indexOf(styleKey) < 0) {
                    continue;
                }

                this[styleKey] = style[styleKey];
            }
        }

        protected drawDebugBounds(context: Lightspeed.UI.InterfaceRenderContext): void {
            var ctx = context.ctx;

            ctx.save();
            ctx.lineWidth = 1;

            var box = this.renderSize;

            ctx.strokeStyle = 'blue'
            ctx.strokeRect(box.left, box.top, box.width, box.height);

            box = this.reduceBox(box, this.margin);

            ctx.strokeStyle = 'orange'
            ctx.strokeRect(box.left, box.top, box.width, box.height);

            box = this.reduceBox(box, this.getBorderThickness().half);

            ctx.strokeStyle = 'green'
            ctx.strokeRect(box.left, box.top, box.width, box.height);

            ctx.restore();
        }

        protected drawElementBackground(context: Lightspeed.UI.InterfaceRenderContext): void {
            var ctx = context.ctx;

            var renderSizeLessMarginsAndBorder = this.renderSize;
            renderSizeLessMarginsAndBorder = this.reduceBox(renderSizeLessMarginsAndBorder, this.margin);
            renderSizeLessMarginsAndBorder = this.reduceBox(renderSizeLessMarginsAndBorder, this.getBorderThickness().half);

            CtxHelpers.fillRoundRect(ctx, renderSizeLessMarginsAndBorder.left, renderSizeLessMarginsAndBorder.top, renderSizeLessMarginsAndBorder.width, renderSizeLessMarginsAndBorder.height, this.borderRadius)
            CtxHelpers.strokeRoundRect(ctx, renderSizeLessMarginsAndBorder.left, renderSizeLessMarginsAndBorder.top, renderSizeLessMarginsAndBorder.width, renderSizeLessMarginsAndBorder.height, this.borderRadius)
        }

        abstract hitTest(mouseLocation: Vector) :UiElement;

        onMouseDown(mouseLocation: Vector): void {
            this._mouseDownHandlers.forEach(h => h(mouseLocation));
        }

        onMouseMove(mouseLocation: Vector): void {
            this._mouseMoveHandlers.forEach(h => h(mouseLocation));
        }

        onMouseEnter(mouseLocation: Vector): void {
            this._mouseEnterHandlers.forEach(h => h(mouseLocation));
        }

        onMouseLeave(mouseLocation: Vector): void {
            this._mouseLeaveHandlers.forEach(h => h(mouseLocation));
        }

        addMouseDownHandler(handler: (mouseLocation: Vector) => void) {
            this._mouseDownHandlers.push(handler);
        }

        addMouseMoveHandler(handler: (mouseLocation: Vector) => void) {
            this._mouseMoveHandlers.push(handler);
        }

        addMouseEnterHandler(handler: (mouseLocation: Vector) => void) {
            this._mouseEnterHandlers.push(handler);
        }

        addMouseLeaveHandler(handler: (mouseLocation: Vector) => void) {
            this._mouseLeaveHandlers.push(handler);
        }

        protected getBorderThickness() : Thickness {
            return Thickness.all(this.borderThickness)
        }

        abstract measure(context: InterfaceRenderContext, availableSize: Size) :Size;

        arrange(context: InterfaceRenderContext, finalSize: Box) :Box {
            return finalSize;
        }

        protected constrainSize(size: Size) :Size {
            if (this.width !== null) {
                size = size.withWidth(width => this.width);
            } 
            
            if (this.minWidth !== null) {
                size = size.withWidth(width => Math.max(width, this.minWidth));
            }

            if (this.maxWidth !== null) {
                size = size.withWidth(width => Math.min(width, this.maxWidth));
            }

            if (this.height !== null) {
                size = size.withHeight(height => this.height);
            } 
            
            if (this.minHeight !== null) {
                size = size.withHeight(height => Math.max(height, this.minHeight));
            }

            if (this.maxHeight !== null) {
                size = size.withHeight(height => Math.min(height, this.maxHeight));
            }

            return size;
        }

        protected reduceBox(box: Box, thickness: Thickness) :Box {
            if (!thickness) {
                return box;
            }

            return new Box(
                box.left + thickness.left,
                box.top + thickness.top,
                box.width - (thickness.left + thickness.right),
                box.height - (thickness.top + thickness.bottom)
            );
        }

        protected increaseBox(box: Box, thickness: Thickness) :Box {
            if (!thickness) {
                return box;
            }

           return new Box( 
                box.left - thickness.left,
                box.top - thickness.top,
                box.width + (thickness.left + thickness.right),
                box.height + (thickness.top + thickness.bottom)
            );
        }

        protected reduceSize(size: Size, thickness: Thickness) :Size {
            if (!thickness) {
                return size;
            }

           return new Size(
                size.width - (thickness.left + thickness.right),
                size.height - (thickness.top + thickness.bottom)
            );
        }

        protected increaseSize(size: Size, thickness: Thickness) :Size{
            if (!thickness) {
                return size;
            }

            return new Size( 
                size.width + (thickness.left + thickness.right),
                size.height + (thickness.top + thickness.bottom)
            );
        }
    }

    export enum HorizontalAlignment {
        left,
        center,
        right,
        stretch,
    }

    export enum VerticalAlignment {
        top,
        center,
        bottom,
        stretch,
    }
}