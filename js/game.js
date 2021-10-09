import Phaser from 'phaser';
import constants from './constants.json';

// create new scene
let scene = new Phaser.Scene('Game');

// load assets
scene.preload = function() {
    // load images
    this.load.image('background', 'assets/background.png');
    this.load.image('player', 'assets/player.png');
};

// called once after the preload ends
scene.create = function() {
    // create bg sprite
    let background = this.add.sprite(0, 0, 'background');

    // change the origin to the top-left corner
    background.setOrigin(0, 0);

    let player = this.add.sprite(0, 0, 'player');
    player.setPosition(constants.screen.width / 2, constants.screen.height / 2);
};

// set the configuration of the game
const config = {
    type: Phaser.AUTO,
    width: constants.screen.width,
    height: constants.screen.height,
    scene: scene
};

// create new game, pass the configutation
let game = new Phaser.Game(config);