namespace Lightspeed.Utils {
    export class Random {
        public static Current: Random = new Random();

        public getBetween(min: number, max: number) {
            return (max - min) * this.next() + min;
        }

        public getIntBetween(min: number, max: number) {
            return Math.floor(this.getBetween(min, max));
        }

        public next(factor?: number) {
            return Math.random() * (factor || 1);
        } 

        public nextInt(upperBound?: number) {
            return Math.floor(Math.random() * (upperBound || 10));
        }

        public pick<TItem>(array: TItem[]) {
            var index = this.nextInt(array.length);
            return array[index];
        }
    }
}