import Phaser from 'phaser';
import { CHAR_H, CHAR_W, heroSheet, HERO_FRAMES, npcSheet } from '../art/characters';
import {
  backdrop,
  boulderTexture,
  caveMouthTexture,
  endingBackdrop,
  flameSheet,
  itemTexture,
  menuBackdrop,
  particleTextures,
  PROP_KINDS,
  propTexture,
  shipTexture,
  tileset,
  waterTexture,
} from '../art/world';
import { ITEM_ORDER } from '../items';
import type { Theme } from '../levels';
import { NPCS } from '../npcs';

function addCanvas(scene: Phaser.Scene, key: string, canvas: HTMLCanvasElement) {
  if (scene.textures.exists(key)) return scene.textures.get(key);
  return scene.textures.addCanvas(key, canvas)!;
}

function addSheet(scene: Phaser.Scene, key: string, canvas: HTMLCanvasElement, fw: number, fh: number) {
  if (scene.textures.exists(key)) return;
  const tex = scene.textures.addCanvas(key, canvas)!;
  const cols = Math.floor(canvas.width / fw);
  for (let i = 0; i < cols; i++) tex.add(i, 0, i * fw, 0, fw, fh);
}

const THEMES: Theme[] = ['lotus', 'cyclops', 'aeolus', 'passage'];

/** Generate every texture and animation the game uses (no image files). */
export function registerTextures(scene: Phaser.Scene) {
  addSheet(scene, 'hero', heroSheet(), CHAR_W * 2, CHAR_H * 2);
  for (const npc of NPCS) addSheet(scene, `npc-${npc.key}`, npcSheet(npc.look), CHAR_W * 2, CHAR_H * 2);
  addCanvas(scene, 'tiles', tileset());
  for (const id of ITEM_ORDER) addCanvas(scene, `item-${id}`, itemTexture(id));
  for (const kind of PROP_KINDS) addCanvas(scene, `prop-${kind}`, propTexture(kind));
  addSheet(scene, 'flame', flameSheet(), 16, 16);
  addCanvas(scene, 'ship', shipTexture());
  addCanvas(scene, 'windship', shipTexture('#e6f4f8', '#2f8190'));
  addCanvas(scene, 'boulder', boulderTexture());
  addCanvas(scene, 'cave-light', caveMouthTexture());
  for (const [k, c] of Object.entries(particleTextures())) addCanvas(scene, `fx-${k}`, c);
  for (const t of THEMES) {
    const b = backdrop(t);
    addCanvas(scene, `bg-${t}-sky`, b.sky);
    addCanvas(scene, `bg-${t}-far`, b.far);
    addCanvas(scene, `bg-${t}-mid`, b.mid);
    addCanvas(scene, `water-${t}`, waterTexture(t));
  }
  const m = menuBackdrop();
  addCanvas(scene, 'bg-menu-sky', m.sky);
  addCanvas(scene, 'bg-menu-far', m.far);
  addCanvas(scene, 'bg-menu-mid', m.mid);
  addCanvas(scene, 'end-victory', endingBackdrop('victory'));
  addCanvas(scene, 'end-death', endingBackdrop('death'));

  // A 1×1 white pixel for glows and flashes.
  if (!scene.textures.exists('px')) {
    const c = document.createElement('canvas');
    c.width = c.height = 4;
    const ctx = c.getContext('2d')!;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, 4, 4);
    scene.textures.addCanvas('px', c);
  }
  // Soft radial glow.
  if (!scene.textures.exists('glow')) {
    const c = document.createElement('canvas');
    c.width = c.height = 64;
    const ctx = c.getContext('2d')!;
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,220,150,0.9)');
    g.addColorStop(1, 'rgba(255,180,80,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 64);
    scene.textures.addCanvas('glow', c);
  }

  const a = scene.anims;
  if (!a.exists('hero-idle')) {
    a.create({ key: 'hero-idle', frames: a.generateFrameNumbers('hero', { frames: HERO_FRAMES.idle }), frameRate: 2, repeat: -1 });
    a.create({ key: 'hero-walk', frames: a.generateFrameNumbers('hero', { frames: HERO_FRAMES.walk }), frameRate: 10, repeat: -1 });
    a.create({ key: 'hero-jump', frames: [{ key: 'hero', frame: HERO_FRAMES.jump }] });
    a.create({ key: 'hero-fall', frames: [{ key: 'hero', frame: HERO_FRAMES.fall }] });
    a.create({ key: 'hero-hurt', frames: [{ key: 'hero', frame: HERO_FRAMES.hurt }] });
    a.create({ key: 'flame', frames: a.generateFrameNumbers('flame', { start: 0, end: 1 }), frameRate: 6, repeat: -1 });
    for (const npc of NPCS) {
      a.create({ key: `npc-${npc.key}-idle`, frames: a.generateFrameNumbers(`npc-${npc.key}`, { start: 0, end: 1 }), frameRate: 1.6, repeat: -1 });
    }
  }
}
