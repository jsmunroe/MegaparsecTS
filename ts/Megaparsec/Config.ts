var Config = {
    keys: {
        moveUp : ['ArrowUp', 'KeyW'],
        moveDown: ['ArrowDown', 'KeyS'],
        moveLeft: ['ArrowLeft', 'KeyA'], 
        moveRight: ['ArrowRight', 'KeyD'],
        pause: ['KeyP', 'Pause'],
        primaryFire: ['Space']
    }, 
    strings: {
        pauseMessage: 'Paused',
        pauseSubtext: 'Press "P" to resume.',
    },
    styles: {
        textColor: '#AAA',
        messageTextSize: 30,
        messageSubtextSize: 10
    },
    imageScale: 0.075,
    agents: {
        player: { 
            image: './img/player.png' 
        },
        enemy1: {
            waveMode: 'OffsetWaveMode',
            horizontalConstraintTopology: 'Wrap', 
            virticalConstraintTopology: 'Block', 
            controllers: [
                { name:'Swoop' },
                { name:'Bounce' },
                { name:'Loop' }
            ],
            width: (500 * 0.075),
            height: (253 * 0.075),
            sheildType: 'Energy',
            images: [
                './img/enemy1.blue.png',
                './img/enemy1.cyan.png',
                './img/enemy1.green.png',
                './img/enemy1.magenta.png',
                './img/enemy1.orange.png'
            ] 
        }, 
        enemy2: {
            waveMode: 'SerialWaveMode',
            horizontalConstraintTopology: 'Wrap', 
            virticalConstraintTopology: 'Block', 
            controllers: [
                { name:'Target' }
            ],
            width: (459 * 0.075),
            height: (378 * 0.075),
            sheildType: 'Time',
            images: [
                './img/enemy2.blue.png',
                './img/enemy2.cyan.png',
                './img/enemy2.green.png',
                './img/enemy2.magenta.png',
                './img/enemy2.red.png'
            ]
        },
        enemy3: {
            waveMode: 'OffsetWaveMode',
            horizontalConstraintTopology: 'Wrap', 
            virticalConstraintTopology: 'Block', 
            controllers: [
                { name:'Wobble' }
            ],
            width: (369 * 0.075),
            height: (244 * 0.075),
            sheildType: 'Energy',
            images: [
                './img/enemy3.blue.png',
                './img/enemy3.cyan.png',
                './img/enemy3.green.png',
                './img/enemy3.magenta.png',
                './img/enemy3.red.png'
            ]
        }, 
        enemy4: {
            waveMode: 'OffsetWaveMode',
            horizontalConstraintTopology: 'Wrap', 
            virticalConstraintTopology: 'Block', 
            controllers: [
                { name:'Flank' }
            ],
            width: (336 * 0.075),
            height: (268 * 0.075),
            sheildType: 'Energy',
            frameCount: 4,
            images: [
                './img/enemy4.green.png',
                './img/enemy4.cyan.png',
                './img/enemy4.blue.png',
                './img/enemy4.red.png',
                './img/enemy4.magenta.png'
            ]
        }, 
        asteroid: {
            waveMode: 'OffsetWaveMode',
            waveCount: 100,
            interval: 250,
            sheildType: 'None',
            horizontalConstraintTopology: 'Wrap', 
            virticalConstraintTopology: 'Block', 
            controllers: [
                { name:'Rain' }
            ],
            width: 50,
            height: 50,
            scaleRange: [0.1, 1],
            images: [
                './img/asteroid.png',
            ]
        }
    }
};