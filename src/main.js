import Phaser from 'phaser';
import TitleScreen from './scenes/TitleScreen';

if (typeof Phaser === 'undefined') {
    console.error('Phaser is not loaded properly');
} else {
    console.log('Phaser version:', Phaser.VERSION);
}

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: "#fff",
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [TitleScreen]
};

const game = new Phaser.Game(config);

// Resize the game when the window is resized
window.addEventListener('resize', () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
});

// game.scene.add('titlescreen', TitleScreen);  

game.scene.start('titlescreen');
// game.scene.add('demo', Demo);
// game.scene.start('demo');
