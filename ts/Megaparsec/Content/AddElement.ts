namespace Megaparsec {
    export class AddElement extends Lightspeed.Element {
        private _element: Lightspeed.Element;

        constructor(element: Lightspeed.Element) {
            super();

            this._element = element;
        }

        init(context: Lightspeed.ElementInitContext) : void {
            context.pushElement(this._element);
            this.kill();
        }
    }
}