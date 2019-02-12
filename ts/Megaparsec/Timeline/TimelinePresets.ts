namespace Megaparsec {
    export class TimelinePresets {
        public static classic() :Timeline {
            var timeline: Timeline = Timeline.start()
                .addElement(new Hills('#0d1c01'))
                //.addEvent(new StartGame(1, '#0d1c01'))
                .addElement(new Comets())
                .addLevel(level => level
                    .addWave('enemy1', 1)
                    .addWave('enemy2', 1)
                    .addWave('enemy3', 1)
                    .addWave('enemy2', 2)
                    .addWave('enemy4', 1)
                    .addWave('asteroid', 3))
                .addEvent(new ChangeLevel(2, '#DD0000'))
                .addLevel(level => level
                    .addWave('enemy1', 2)
                    .addWave('enemy2', 2)
                    .addWave('enemy3', 2)
                    .addWave('enemy2', 3)
                    .addWave('enemy4', 2)
                    .addWave('asteroid', 2))
                .addEvent(new ChangeLevel(3, '#0000AA'))
                .addLevel(level => level
                    .addWave('enemy1', 3)
                    .addWave('enemy2', 3)
                    .addWave('enemy3', 3)
                    .addWave('enemy2', 4)
                    .addWave('enemy4', 3)
                    .addWave('asteroid', 3))

            return timeline;
        }
    }
}