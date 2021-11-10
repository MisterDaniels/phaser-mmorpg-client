import Phaser from 'phaser';
import constants from './constants.json';

import {
    BootScene, TitleScene, GameScene, UiScene
} from './scenes';

const config = {
    type: Phaser.AUTO,
    width: constants.screen.width,
    height: constants.screen.height,
    scene: [
        BootScene,
        TitleScene,
        GameScene,
        UiScene
    ],
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                y: 0
            }
        }
    },
    pixelArt: true,
    roundPixels: true
};

const game = new Phaser.Game(config);
