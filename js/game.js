import Phaser from 'phaser';
import constants from './constants.json';

let scene = new Phaser.Scene('Game');

scene.init = function() {
    this.playerSpeed = constants.player.speed;

    this.enemyMinSpeed = 2;
    this.enemyMaxSpeed = 5;
    this.enemyMinY = 80;
    this.enemyMaxY = 280;

    this.isTerminating = false;
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

    this.enemies = this.add.group({
        key: 'enemy',
        repeat: 5,
        setXY: {
            x: 90,
            y: 100,
            stepX: 80,
            stepY: 20
        }
    });

    Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.4, -0.4);
    Phaser.Actions.Call(this.enemies.getChildren(), function(enemy) {
        enemy.flipX = true;

        let dir = Math.random() < 0.5 ? 1 : -1;
        let speed = this.enemyMinSpeed + Math.random() * (this.enemyMaxSpeed - this.enemyMinSpeed); 
        enemy.speed = dir * speed;
    }, this);
};

scene.update = function () {
    if(this.isTerminating) return;

    if (this.input.activePointer.isDown) {
        this.player.x += this.playerSpeed;
    }

    let enemies = this.enemies.getChildren();
    let numEnemies = enemies.length;
    
    let playerRect = this.player.getBounds();

    let treasureRect = this.treasure.getBounds();

    if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, treasureRect)) {
        this.scene.restart();
        return;
    }
    
    for(let i = 0; i < numEnemies; i++) {
        enemies[i].y += enemies[i].speed;

        const conditionUp = enemies[i].speed < 0 && enemies[i].y <= this.enemyMinY;
        const conditionDown = enemies[i].speed > 0 && enemies[i].y >= this.enemyMaxY;

        if (conditionUp || conditionDown) {
            enemies[i].speed *= -1;
        }

        let enemyRect = enemies[i].getBounds();

        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, enemyRect)) {
            return this.gameOver();
        }
    }
};

scene.gameOver = function() {
    this.isTerminating = true;
    
    this.cameras.main.shake(500);

    this.cameras.main.on('camerashakecomplete', function(camera, effect) {
        this.cameras.main.fade(500);
    }, this);

    this.cameras.main.on('camerafadeoutcomplete', function(camera, effect) {
        this.scene.restart();
    }, this);
}

const config = {
    type: Phaser.AUTO,
    width: constants.screen.width,
    height: constants.screen.height,
    scene: scene
};

let game = new Phaser.Game(config);