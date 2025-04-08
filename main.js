import { resources } from "./src/Resource.js";
import { Sprite } from "./src/Sprite.js";
import { Vector2 } from "./src/Vector2.js";
import "./style.css";

const canvas = document.querySelector("#game-canvas");

const ctx = canvas.getContext("2d");

const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180),
});
const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180),
});

const hero = new Sprite({
  resource: resources.images.unicorn,
  frameSize: new Vector2(17, 17),
  hFrames: 4,
  vFrames: 1,
  frame: 4,
});

// const hero = new Sprite({
//   resource: resources.images.hero,
//   frameSize: new Vector2(32, 32),
//   hFrames: 3,
//   vFrames: 8,
//   frame: 1,
// });

const rainbow = new Sprite({
  resource: resources.images.rainbow,
  frameSize: new Vector2(640, 320),
  hFrames: 1,
  vFrames: 1,
  scale: 0.15,
});

const heroPos = new Vector2(16 * 6, 16 * 6);
const rainbowPos = new Vector2(16 * 8, 0);
const draw = () => {
  skySprite.drawImage(ctx, 0, 0);
  groundSprite.drawImage(ctx, 0, 0);
  hero.drawImage(ctx, heroPos.x, heroPos.y);
  rainbow.drawImage(ctx, rainbowPos.x, rainbowPos.y);
};

setInterval(() => {
  draw();
}, 300);
