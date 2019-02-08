/// <reference path="../Lightspeed/Utils/Keyboard.ts" />
/// <reference path="../Lightspeed/Utils/Random.ts" />

namespace Megaparsec {
    export class Color {
        static getRandomColor() {
            var letters = '89ABCDEF';
            var color = '#';

            for (var i = 0; i < 6; i++) {
                color += letters[Random.Current.nextInt(letters.length)];
            }

            return color;
        }

        static getRandomShade(base: string, minShade: number, maxShade: number) :string {
            return Color.lum(base, Random.Current.getBetween(minShade, maxShade));
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
    
}