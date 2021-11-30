import Phaser from 'phaser';

import { Chest } from '../objects';
import { Player } from '../characters';
import { Map } from '../map';
import { GameManager } from '../game';
import { Monster } from '../objects';

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
        this.monsters = this.physics.add.group();
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

    spawnChest(chest) {
        let chestObject = this.chests.getFirstDead();

        if (!chestObject) {
            chestObject = new Chest(this, chest.x * 2, chest.y * 2, 'items', 0, chest.gold, chest.id);
            this.chests.add(chest);
            return;
        }
        
        chestObject.coins = chest.gold;
        chestObject.id = chest.id;

        chestObject.setPosition(chest.x * 2, chest.y * 2);
        chestObject.makeActive();
    }

    spawnMonster(monsterObject) {
        let monster = this.monsters.getFirstDead();

        if (monster) {
            monster.id = monsterObject.id;
            monster.health = monsterObject.health;
            monster.maxHealth = monsterObject.maxHealth;
            monster.setTexture('monsters', monsterObject.frame);
            monster.setPosition(monsterObject.x * 2, monsterObject.y * 2);
            monster.makeActive();
        }

        monster = new Monster(
            this,
            monsterObject.x * 2,
            monsterObject.y * 2,
            'monsters',
            monsterObject.frame,
            monsterObject.id,
            monsterObject.health,
            monsterObject.maxHealth
        );

        this.monsters.add(monster);
        monster.setCollideWorldBounds(true);
    }

    createGameManager() {
        this.events.on('spawnPlayer', (location) => {
            this.createPlayer(location);
            this.addCollisions();
        });

        this.events.on('chestSpawned', (chest) => {
            this.spawnChest(chest);
        });

        this.events.on('monsterSpawned', (monster) => {
            this.spawnMonster(monster);
        });

        this.gameManager = new GameManager(this, this.map.map.objects);
        this.gameManager.setup();
    }

}

export default GameScene;