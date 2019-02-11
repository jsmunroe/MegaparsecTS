namespace Megaparsec {
    export class TimelinePresets {
        public static classic() :Timeline {
            var timeline: Timeline = Timeline.start()
                .addElement(new Hills('#0d1c01'))
                //.addEvent(new StartGame(1, '#0d1c01'))
                .addLevel(level => level
                    .pushWave('enemy3', 1)
                    .pushWave('enemy2', 1)
                    .pushWave('enemy3', 1)
                    .pushWave('enemy2', 2)
                    .pushWave('enemy4', 1)
                    .pushWave('asteroid', 1)
                    .build())
                .addEvent(new ChangeLevel(2, '#DD0000'))
                .addLevel(level => level
                    .pushWave('enemy1', 2)
                    .pushWave('enemy2', 2)
                    .pushWave('enemy3', 2)
                    .pushWave('enemy2', 3)
                    .pushWave('enemy4', 2)
                    .pushWave('asteroid', 2)
                    .build())
                .addEvent(new ChangeLevel(3, '#0000AA'))
                .addLevel(level => level
                    .pushWave('enemy1', 3)
                    .pushWave('enemy2', 3)
                    .pushWave('enemy3', 3)
                    .pushWave('enemy2', 4)
                    .pushWave('enemy4', 3)
                    .pushWave('asteroid', 3)
                    .build())

            return timeline;
        }
    }
}