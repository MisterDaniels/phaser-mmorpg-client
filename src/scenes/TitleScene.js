import Phaser from 'phaser';

import { Button } from '../ui';

class TitleScene extends Phaser.Scene {

    constructor() {

        super('Title');

    }

    create() {

        this.titleText = this.add.text(this.scale.width / 2, this.scale.height / 2, 'MMORPG', {
            fontSize: '64px',
            fill: '#fff'
        });
        this.titleText.setOrigin(0.5);

        this.startButton = new Button(this, this.scale.width / 2, this.scale.height * 0.65, 'Start', () => {

            this.scene.start('Game');

        });

    }

}

export default TitleScene;
