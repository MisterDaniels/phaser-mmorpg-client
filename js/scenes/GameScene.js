import Phaser from 'phaser';

import { Chest } from '../objects';
import { Player } from '../characters';

class GameScene extends Phaser.Scene {
    
    constructor() {
        super('Game');
    }

    create() {
        let goldPickupAudio = this.sound.add('gold', {
            loop: false,
            volume: 0.2
        });
    
        let button = this.add.image(100, 100, 'button1');
        button.setOrigin(0.5, 0.5);
    
        this.add.sprite(300, 100, 'button1');
    
        this.chest = new Chest(this, 300, 300, 'items', 0);
    
        this.wall = this.physics.add.image(500, 100, 'button1');
        this.wall.setImmovable();
    
        this.player = new Player(this, 32, 32, 'characters', 0);
    
        this.physics.add.collider(this.player, this.wall);
        this.physics.add.overlap(this.player, this.chest, function(player, chest) {
            goldPickupAudio.play();
            chest.destroy();
        });
    
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        this.player.update(this.cursors);
    }

}

export default GameScene;