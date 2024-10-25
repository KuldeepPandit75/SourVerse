import Phaser from "phaser"

class TitleScreen extends Phaser.Scene {
    constructor() {
        super('TitleScreen');
    }

    preload() {
        this.load.image('player', '../assets/car.jpg');
        this.load.image('entryGate', '../assets/sprites/idleChar.png');
        this.load.image('stall', '../assets/sprites/idleChar.png');
        this.load.image('meetingRoom', '../assets/sprites/idleChar.png');
        this.load.image('background', 'https://i.postimg.cc/P5M1TFGm/background.webp');
    }

    create() {
        // create background
        this.background = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'background');
        
        // Scale background to cover the entire screen
        const scaleX = this.cameras.main.width / this.background.width;
        const scaleY = this.cameras.main.height / this.background.height;
        const scale = Math.max(scaleX, scaleY);
        this.background.setScale(scale);

        // Create stalls group
        this.stalls = this.physics.add.staticGroup();
        const stallPositions = [
            { x: this.cameras.main.width * 0.25, y: this.cameras.main.height * 0.33 },
            { x: this.cameras.main.width * 0.75, y: this.cameras.main.height * 0.33 },
            { x: this.cameras.main.width * 0.25, y: this.cameras.main.height * 0.66 },
            { x: this.cameras.main.width * 0.75, y: this.cameras.main.height * 0.66 }
        ];
        stallPositions.forEach(pos => {
            this.stalls.create(pos.x, pos.y, 'stall');
        });

        // Create player
        this.player = this.physics.add.sprite(this.cameras.main.width / 2, this.cameras.main.height * 0.1, 'player');
        this.player.setCollideWorldBounds(true);

        // Add overlap detection between player and stalls
        this.physics.add.overlap(this.player, this.stalls, this.handleStallContact, null, this);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });

        // Flag to track if player is in contact with a stall
        this.playerInStallContact = false;
    }

    update() {
        const speed = 160;

        if (this.cursors.left.isDown || this.wasd.left.isDown) {
            this.player.setVelocityX(-speed);
        } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
            this.player.setVelocityX(speed);
        } else {
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown || this.wasd.up.isDown) {
            this.player.setVelocityY(-speed);
        } else if (this.cursors.down.isDown || this.wasd.down.isDown) {
            this.player.setVelocityY(speed);
        } else {
            this.player.setVelocityY(0);
        }
    }

    handleStallContact(player, stall) {
        if (!this.playerInStallContact) {
            this.playerInStallContact = true;
            this.onStallContact(stall);
        }
    }

    onStallContact(stall) {
        console.log('Player has come in contact with a stall!');
        
        const paymentButton = document.querySelector('.button-payment');
        paymentButton.style.display = 'block';
        const videoButton = document.querySelector('.button-video');
        videoButton.style.display = 'block';

        // Example: Display stall information
        const stallInfo = this.add.text(stall.x, stall.y - 50, 'Solar Project Info', {
            fontSize: '16px',
            fill: '#ffffff',
            backgroundColor: '#000000',
            padding: { x: 5, y: 5 }
        });

        // Remove the text after 3 seconds
        this.time.delayedCall(500, () => {
            stallInfo.destroy();
            paymentButton.style.display = 'none';
            videoButton.style.display = 'none';
            this.playerInStallContact = false; // Reset the contact flag after the interaction
        });
    }
}

export default TitleScreen;
