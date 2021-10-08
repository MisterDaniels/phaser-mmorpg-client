import Phaser from 'phaser';

// create new scene
let scene = new Phaser.Scene('Game');

// set the configuration of the game
const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    scene: scene
};

// create new game, pass the configutation
let game = new Phaser.Game(config);