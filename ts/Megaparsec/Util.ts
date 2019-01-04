namespace Megaparsec {
    export class Random {
        static getBetween(min: number, max: number) {
            return (max - min) * Random.next() + min;
        }
    
        static getIntBetween(min: number, max: number) {
            return Math.floor(this.getBetween(min, max));
        }
    
        static next(factor?: number) {
            return Math.random() * (factor || 1);
        } 
    
        static nextInt(upperBound?: number) {
            return Math.floor(Math.random() * (upperBound || 10));
        }
    }

    export class Color {
        static getRandomColor() {
            var letters = '89ABCDEF';
            var color = '#';

            for (var i = 0; i < 6; i++) {
                color += letters[Random.nextInt(letters.length)];
            }

            return color;
        }

        static getRandomShade(base: string, minShade: number, maxShade: number) :string {
            return Color.lum(base, Random.getBetween(minShade, maxShade));
        }

        static lum(color: string, percent: number) :string {   
            var f=parseInt(color.slice(1),16)
            var t=percent<0?0:255;
            var p=percent<0?percent*-1:percent
            var R=f>>16;
            var G=f>>8&0x00FF;
            var B=f&0x0000FF;
    
            return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
        }
    }

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