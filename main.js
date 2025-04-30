import { GameLoop } from "./src/GameLoop.js";
import { gridCells, isSpaceFree } from "./src/helpers/grid.js";
import { moveTowards } from "./src/helpers/moveTowards.js";
import { DOWN, Input, LEFT, RIGHT, UP } from "./src/Input.js";
import { walls } from "./src/levels/level1.js";
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
  vFrames: 2,
  frame: 1,
  position: new Vector2(gridCells(6), gridCells(6)),
});

// const hero = new Sprite({
//   resource: resources.images.hero,
//   frameSize: new Vector2(32, 32),
//   hFrames: 3,
//   vFrames: 8,
//   frame: 1,
//   position: new Vector2(gridCells(6), gridCells(5)),
// });

const heroDestinationPosition = hero.position.duplicate();
const rainbow = new Sprite({
  resource: resources.images.rainbow,
  frameSize: new Vector2(640, 320),
  hFrames: 1,
  vFrames: 1,
  scale: 0.15,
});
const shadow = new Sprite({
  resource: resources.images.shadow,
  frameSize: new Vector2(32, 32),
});

//const heroPos = new Vector2(16 * 6, 16 * 6);
const rainbowPos = new Vector2(16 * 8, 0);

const input = new Input();

const update = () => {
  const distance = moveTowards(hero, heroDestinationPosition, 1);
  const hasArrived = distance <= 1;
  if (hasArrived) {
    tryMove();
  }
};

const tryMove = () => {
  if (!input.direction) return;

  let nextX = heroDestinationPosition.x;
  let nextY = heroDestinationPosition.y;

  const gridSize = 16;

  if (input.direction === DOWN) {
    nextY += gridSize;
    //add new sprites
  }
  if (input.direction === UP) {
    nextY -= gridSize;
  }
  if (input.direction === LEFT) {
    nextX -= gridSize;

    if (hero.frame === 4) {
      hero.frame = 5;
    } else if (hero.frame === 5) {
      hero.frame = 6;
    } else hero.frame = 4;
  }
  if (input.direction === RIGHT) {
    nextX += gridSize;

    if (hero.frame === 1) {
      hero.frame = 2;
    } else if (hero.frame === 2) {
      hero.frame = 3;
    } else hero.frame = 1;
  }

  //check if space is free to move

  if (isSpaceFree(walls, nextX, nextY)) {
    heroDestinationPosition.x = nextX;
    heroDestinationPosition.y = nextY;
  }
};

const draw = () => {
  skySprite.drawImage(ctx, 0, 0);
  groundSprite.drawImage(ctx, 0, 0);
  const heroOffset = new Vector2(-8, -21);
  const heroPosX = hero.position.x + 10 + heroOffset.x;
  const heroPosY = hero.position.y + 5 + heroOffset.y;

  //shadow.drawImage(ctx, heroPosX ,  heroPosY);
  hero.drawImage(ctx, heroPosX, heroPosY);
  rainbow.drawImage(ctx, rainbowPos.x, rainbowPos.y);
};
const gameLoop = new GameLoop(update, draw);
gameLoop.start();
