namespace Lightspeed {
    export class Element {
        private static _nextId: number = 0;
        private _id: number;

        private _isDead: boolean = false;

        public get id() {
            return this._id;
        }

        public get isDead() {
            return this._isDead;
        }

        constructor() {
            this._id = Element._nextId++;
        }

        init(context: ElementInitContext) : void {
            // optionally overloaded by extending classes set the initial state of this element.
        }

        update(context: FrameUpdateContext): void {
            // optionally overloaded by extending classes to update element state per frame time.
        }

        render(context: FrameRenderContext): void {
            // optionally overloaded by extending classes to render element.
        }

        kill() : void {
            this._isDead = true;
        }
    }
}