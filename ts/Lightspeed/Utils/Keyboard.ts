namespace Lightspeed.Utils {
    export class Keyboard {
        private _handlers = [];
        private _currentKeys = {};

        public static Current: Keyboard = new Keyboard();

        private constructor() {
            var self = this;
            window.document.addEventListener('keydown', event => self.onKeyDown(event));
            window.document.addEventListener('keyup', event => self.onKeyUp(event));
        }

        key(keyCode: string, callback?: Function) :boolean {
            if (callback) {
                this._handlers.push({
                    keyCode: keyCode,
                    callback: callback
                })
            }

            return !!this._currentKeys[keyCode];
        }

        keys(keyCodes: string[], callback?: Function) :boolean {
        var anyPressed = false;
            for (let i = 0; i < keyCodes.length; i++) {
                anyPressed = anyPressed || this.key(keyCodes[i], callback);
            }

            return anyPressed;
        }

        onKeyDown(event: KeyboardEvent) :void {
            var handlers = this._handlers.filter(i => i.keyCode === event.code);

            for (var i = 0; i < handlers.length; i++) {
                handlers[i].callback(event);
            }

            this._currentKeys[event.code] = true;
        }

        onKeyUp(event: KeyboardEvent) :void {
            this._currentKeys[event.code] = false;
        }

    }
}