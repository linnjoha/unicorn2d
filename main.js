import { Animations } from "./src/Animations.js";
import { Camera } from "./src/camera.js";
import { events } from "./src/Events.js";
import { FrameIndexPattern } from "./src/FrameIndexPattern.js";
import { GameLoop } from "./src/GameLoop.js";
import { GameObject } from "./src/GameObject.js";
import { gridCells, isSpaceFree } from "./src/helpers/grid.js";
import { moveTowards } from "./src/helpers/moveTowards.js";
import { DOWN, Input, LEFT, RIGHT, UP } from "./src/Input.js";
import { walls } from "./src/levels/level1.js";
import { Hero } from "./src/objects/Hero/Hero.js";
import {
  STAND_DOWN,
  STAND_RIGHT,
  STAND_UP,
  STAND_LEFT,
  WALK_DOWN,
  WALK_LEFT,
  WALK_RIGHT,
  WALK_UP,
} from "./src/objects/Hero/heroAnimation.js";
import { Rod } from "./src/objects/Rod/Rod.js";
import { resources } from "./src/Resource.js";
import { Sprite } from "./src/Sprite.js";
import { Vector2 } from "./src/Vector2.js";
import "./style.css";

const canvas = document.querySelector("#game-canvas");
const ctx = canvas.getContext("2d");

const mainScene = new GameObject({
  position: new Vector2(0, 0),
});

const skySprite = new Sprite({
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180),
});
const groundSprite = new Sprite({
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180),
});

const rainbow = new Sprite({
  resource: resources.images.rainbow,
  frameSize: new Vector2(640, 320),
  scale: 0.15,
  position: new Vector2(16 * 8, 0),
});
const hero = new Hero(gridCells(6), gridCells(6));
const rod = new Rod(gridCells(7), gridCells(7));
mainScene.input = new Input();

//mainScene.addChild(skySprite);
mainScene.addChild(groundSprite);
mainScene.addChild(rainbow);
mainScene.addChild(hero);
mainScene.addChild(rod);
const camera = new Camera();
mainScene.addChild(camera);
const update = (delta) => {
  mainScene.stepEntry(delta, mainScene);
};

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  skySprite.drawImage(ctx, 0, 0);
  ctx.save();
  ctx.translate(camera.position.x, camera.position.y);
  mainScene.draw(ctx, 0, 0);
  ctx.restore();
};
const gameLoop = new GameLoop(update, draw);
gameLoop.start();
