namespace Megaparsec {
    export class WaveKilledMessage extends Lightspeed.Utils.Message {
        public static get messageName() { return "WaveKilledMessage" }
        
        public wave: Wave;

        constructor(wave: Wave) {
            super(WaveKilledMessage.messageName);

            this.wave = wave;
        }
    }
}