var Config = {
    keys: {
        moveUp : ['ArrowUp', 'KeyW'],
        moveDown: ['ArrowDown', 'KeyS'],
        moveLeft: ['ArrowLeft', 'KeyA'], 
        moveRight: ['ArrowRight', 'KeyD'],
        pause: ['KeyP', 'Pause']
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
        playerShot: './img/player.shot.png',
        enemy1: {
            controllers: [
                { name:'Swoop' },
                { name:'Bounce' },
                { name:'Loop' }
            ],
            images: [
                './img/enemy1.blue.png',
                './img/enemy1.cyan.png',
                './img/enemy1.green.png',
                './img/enemy1.magenta.png',
                './img/enemy1.orange.png'
            ] 
        }, 
        enemy2: {
            controllers: [
                { name:'Loop' }
            ],
            images: [
                './img/enemy2.blue.png',
                './img/enemy2.cyan.png',
                './img/enemy2.green.png',
                './img/enemy2.magenta.png',
                './img/enemy2.red.png'
            ]
        },
        enemy3: {
            controllers: [
                { name:'Target' }
            ],
            images: [
                './img/enemy3.blue.png',
                './img/enemy3.cyan.png',
                './img/enemy3.green.png',
                './img/enemy3.magenta.png',
                './img/enemy3.red.png'
            ]
        }
    }
};