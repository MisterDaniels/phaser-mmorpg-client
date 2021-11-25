import Phaser from 'phaser';

import { Chest } from '../objects';
import { Player } from '../characters';
import { Map } from '../map';
import { GameManager } from '../game';

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
        this.createGroups();

        this.createInput();

        this.createGameManager();

        console.log(`Carregado Game`);

    }

    createAudio() {

        this.goldPickupAudio = this.sound.add('gold', {
            loop: false,
            volume: 0.2
        });

    }

    createGroups() {
        this.chests = this.physics.add.group();
    }

    createPlayer(location) {

        this.player = new Player(this, location[0] * 2, location[1] * 2, 'characters', 0);

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

        if (this.player) this.player.update(this.cursors);

    }

    collectChest(player, chest) {

        this.goldPickupAudio.play();

        this.score += chest.coins;
        this.events.emit('updateScore', this.score);

        chest.makeInactive();

        this.events.emit('pickUpChest', chest.id);
    }

    spawnChest(chestObject) {
        let chest = this.chests.getFirstDead();

        if (!chest) {
            chest = new Chest(this, chestObject.x * 2, chestObject.y * 2, 'items', 0, chestObject.gold, chestObject.id);
            this.chests.add(chest);
            return;
        }
        
        chest.coins = chestObject.gold;
        chest.id = chestObject.id;

        chest.setPosition(chestObject.x * 2, chestObject.y * 2);
        chest.makeActive();
    }

    createGameManager() {
        this.events.on('spawnPlayer', (location) => {
            this.createPlayer(location);
            this.addCollisions();
        });

        this.events.on('chestSpawned', (chest) => {
            this.spawnChest(chest);
        });

        this.gameManager = new GameManager(this, this.map.map.objects);
        this.gameManager.setup();
    }

}

export default GameScene;