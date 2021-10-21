import Phaser from 'phaser';

class Chest extends Phaser.Physics.Arcade.Image {

    constructor(scene, x, y, key, frame) {
        super(scene, x, y, key, frame);

        this.scene = scene;
        this.coins = 10;

        this.scene.physics.world.enable(this);
        this.scene.add.existing(this);
    }

    makeActive() {
        this.setActive(true);
        this.setVisible(true);
        this.body.checkCollision.none = false;
    }

    makeInactive() {
        this.setActive(false);
        this.setVisible(false);
        this.body.checkCollision.none = true;
    }

}

export default Chest;