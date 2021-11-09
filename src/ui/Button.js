import Phaser from 'phaser';

class Button extends Phaser.GameObjects.Container {
  constructor(scene, x, y, text, targetCallback) {
    super(scene, x, y);

    this.scene = scene;
    this.x = x;
    this.y = y;
    this.text = text;
    this.targetCallback = targetCallback;

    this.createButton();

    this.scene.add.existing(this);
  }

  createButton() {
    this.button = this.scene.add.image(0, 0, 'button1');
    this.button.setInteractive();

    this.buttonText = this.scene.add.text(0, 0, this.text, {
      fontSize: '26px',
      fill: '#fff',
    });
    Phaser.Display.Align.In.Center(this.buttonText, this.button);

    this.add(this.button);
    this.add(this.buttonText);

    this.button.on('pointerdown', () => {
      this.targetCallback();
    });

    this.button.on('pointerover', () => {
      this.button.setTexture('button2');
    });

    this.button.on('pointerout', () => {
      this.button.setTexture('button1');
    });
  }
}

export default Button;
