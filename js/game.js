import Phaser from 'phaser';
import constants from './constants.json';

let scene = new Phaser.Scene('Game');

scene.init = function() {
    this.playerSpeed = constants.player.speed;
    this.enemySpeed = 3;
    this.enemyMinY = 80;
    this.enemyMaxY = 280;
};

scene.preload = function() {
    this.load.image('background', 'assets/background.png');
    this.load.image('player', 'assets/player.png');
    this.load.image('enemy', 'assets/dragon.png');
    this.load.image('treasure', 'assets/treasure.png');
};

scene.create = function() {
    let background = this.add.sprite(0, 0, 'background');

    background.setOrigin(0, 0);

    this.player = this.add.sprite(40, this.sys.game.config.height / 2, 'player');

    this.player.depth = 1;
    this.player.setScale(0.5);

    this.treasure = this.add.sprite(this.sys.game.config.width - 80, this.sys.game.config.height / 2, 'treasure');
    this.treasure.setScale(0.6);

    this.enemy = this.add.sprite(120, this.sys.game.config.height / 2, 'enemy');
    this.enemy.flipX = true;
    this.enemy.setScale(0.6);

    let dir = Math.random() < 0.5 ? 1 : -1;
    this.enemy.speed = dir * this.enemySpeed;
};

scene.update = function () {
    if (this.input.activePointer.isDown) {
        this.player.x += this.playerSpeed;
    }
    
    let playerRect = this.player.getBounds();
    let treasureRect = this.treasure.getBounds();

    if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, treasureRect)) {
        this.scene.restart();
        return;
    }

    this.enemy.y += this.enemy.speed;

    const conditionUp = this.enemy.speed < 0 && this.enemy.y <= this.enemyMinY;
    const conditionDown = this.enemy.speed > 0 && this.enemy.y >= this.enemyMaxY;

    if (conditionUp || conditionDown) {
        this.enemy.speed *= -1;
    }
};

const config = {
    type: Phaser.AUTO,
    width: constants.screen.width,
    height: constants.screen.height,
    scene: scene
};

let game = new Phaser.Game(config);