import Phaser from 'phaser';
import { DAWN_WAVES_COLOR, WAVE_COLOR } from './palette';
import { registerTextures } from './textures';

/** Generates all textures, waits for pixel fonts, then hands control to the router. */
export class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  create() {
    registerTextures(this);
    const fonts = typeof document !== 'undefined' && document.fonts ? document.fonts : null;
    const ready = () => this.game.events.emit('odyssey-ready');
    if (fonts) {
      Promise.all([fonts.load('10px "Press Start 2P"'), fonts.load('20px "VT323"')])
        .catch(() => undefined)
        .finally(ready);
    } else {
      ready();
    }
  }
}

/** Animated title backdrop: dusk sea, a sailing galley and drifting clouds. */
export class MenuScene extends Phaser.Scene {
  constructor() {
    super('Menu');
  }

  create() {
    this.cameras.main.setBackgroundColor(0x101b2d);
    this.add.image(0, 0, 'bg-menu-sky').setOrigin(0);
    const far = this.add.tileSprite(0, 0, 960, 540, 'bg-menu-far').setOrigin(0);
    const mid = this.add.tileSprite(0, 0, 960, 540, 'bg-menu-mid').setOrigin(0);
    const water = this.add.tileSprite(0, 470, 960, 80, 'water-lotus').setOrigin(0).setTint(WAVE_COLOR);
    const ship = this.add.image(-160, 470, 'ship').setOrigin(0.5, 1).setScale(1.4);
    this.tweens.add({ targets: ship, x: 1120, duration: 42000, repeat: -1 });
    this.tweens.add({ targets: ship, angle: { from: -2, to: 2 }, y: 474, duration: 1800, yoyo: true, repeat: -1, ease: 'Sine.easeInOut' });
    this.add.tileSprite(0, 500, 960, 60, 'water-lotus').setOrigin(0).setTint(DAWN_WAVES_COLOR);
    this.add
      .particles(0, 0, 'fx-spark', { x: { min: 0, max: 960 }, y: { min: 0, max: 200 }, lifespan: 3000, alpha: { start: 0, end: 0.8 }, scale: { start: 0.5, end: 0 }, frequency: 300 })
      .setDepth(5);
    this.events.on(Phaser.Scenes.Events.UPDATE, (_t: number, d: number) => {
      far.tilePositionX += d * 0.004;
      mid.tilePositionX += d * 0.01;
      water.tilePositionX += d * 0.03;
    });
    this.cameras.main.fadeIn(600);
  }
}

/** Backdrop for the death and victory screens. */
export class EndScene extends Phaser.Scene {
  constructor() {
    super('End');
  }

  create(data: { kind: 'victory' | 'death' }) {
    const victory = data.kind === 'victory';
    this.add.image(0, 0, victory ? 'end-victory' : 'end-death').setOrigin(0);
    if (victory) {
      const ship = this.add.image(-120, 452, 'ship').setOrigin(0.5, 1).setScale(1.2);
      this.tweens.add({ targets: ship, x: 470, duration: 6000, ease: 'Sine.easeOut' });
      this.tweens.add({ targets: ship, angle: { from: -1.5, to: 1.5 }, duration: 1600, yoyo: true, repeat: -1 });
      // Odysseus stands on the pier beside his ship.
      const hero = this.add.sprite(560, 412, 'hero', 0).setOrigin(0.5, 1).setScale(1.5).setAlpha(0);
      hero.play('hero-idle');
      this.tweens.add({ targets: hero, alpha: 1, delay: 5200, duration: 900 });
      this.add
        .particles(0, 0, 'fx-spark', { x: { min: 0, max: 960 }, y: { min: 0, max: 340 }, lifespan: 2600, alpha: { start: 0.9, end: 0 }, frequency: 160 })
        .setDepth(5);
    } else {
      const hero = this.add.sprite(480, 412, 'hero', 8).setOrigin(0.5, 1).setScale(1.5).setAngle(-90).setTint(0x8a3030);
      this.tweens.add({ targets: hero, alpha: { from: 1, to: 0.6 }, duration: 1600, yoyo: true, repeat: -1 });
      this.add
        .particles(0, 0, 'fx-rain', { x: { min: 0, max: 1000 }, y: -10, lifespan: 1200, speedY: 560, speedX: -90, alpha: 0.5, frequency: 16 })
        .setDepth(5);
    }
    this.cameras.main.fadeIn(900);
  }
}
