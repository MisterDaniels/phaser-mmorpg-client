import Phaser from 'phaser';

import { Chest } from '../objects';
import { Player } from '../characters';
import { Map } from '../map';

class GameScene extends Phaser.Scene {
    
    constructor() {
        super('Game');
    }

    init() {
        this.scene.launch('Ui');
        this.score = 0;
    }

    create() {
        this.createMap();

        this.createAudio();
        this.createChests();
        this.createPlayer();

        this.addCollisions();
        this.createInput();
    }

    createAudio() {
        this.goldPickupAudio = this.sound.add('gold', {
            loop: false,
            volume: 0.2
        });
    }

    createChests() {
        this.chests = this.physics.add.group();
        this.chestPositions = [
            [100, 100], 
            [200, 200], 
            [300, 300], 
            [400, 400], 
            [500, 500]
        ];
        this.maxNumberOfChests = 3;

        for (let i = 0; i < this.maxNumberOfChests; i++) {
            this.spawnChest();
        }
    }

    createPlayer() {
        this.player = new Player(this, 224, 224, 'characters', 0);
    }

    addCollisions() {
        this.physics.add.collider(this.player, this.map.blockedLayer);
        this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this);
    }

    createInput() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    createMap() {
        this.map = new Map(this, 'map', 'background', 'background', 'blocked');
    }

    update() {
        this.player.update(this.cursors);
    }

    collectChest(player, chest) {
        this.goldPickupAudio.play();

        this.score += chest.coins;
        this.events.emit('updateScore', this.score);
        
        chest.makeInactive();

        this.time.delayedCall(1000, this.spawnChest, [], this);
    }

    spawnChest() {
        const location = this.chestPositions[Math.floor(Math.random() * this.chestPositions.length)];
        const chest = this.chests.getFirstDead();

        if (!chest) {
            const chest = new Chest(this, location[0], location[1], 'items', 0);
            this.chests.add(chest);
            return;
        }

        chest.setPosition(location[0], location[1]);
        chest.makeActive();
    }

}

export default GameScene;