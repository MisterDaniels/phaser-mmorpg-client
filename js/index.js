import Phaser from 'phaser';
import constants from './constants.json';

import { BootScene, GameScene, TitleScene, UiScene } from './scenes';

const config = {
    type: Phaser.AUTO,
    width: constants.screen.width,
    height: constants.screen.height,
    scene: [
        BootScene,
        GameScene,
        TitleScene,
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
    }
};

let game = new Phaser.Game(config);