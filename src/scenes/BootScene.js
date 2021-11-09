import Phaser from 'phaser';

class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.loadImages();
    this.loadSpriteSheets();
    this.loadAudio();
    this.loadTileMap();
  }

  loadImages() {
    this.load.image('button1', 'assets/images/ui/blue_button01.png');
    this.load.image('button2', 'assets/images/ui/blue_button02.png');

    this.load.image('background', 'assets/images/level/background-extruded.png');
  }

  loadSpriteSheets() {
    this.load.spritesheet('items', 'assets/images/items.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('characters', 'assets/images/characters.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  loadAudio() {
    this.load.audio('gold', ['assets/audio/Pickup.wav']);
  }

  loadTileMap() {
    this.load.tilemapTiledJSON('map', 'assets/map/large_level.json');
  }

  create() {
    this.scene.start('Game');
  }
}

export default BootScene;
