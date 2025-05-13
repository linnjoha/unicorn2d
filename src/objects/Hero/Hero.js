import { Animations } from "../../Animations";
import { events } from "../../Events";
import { FrameIndexPattern } from "../../FrameIndexPattern";
import { GameObject } from "../../GameObject";
import { gridCells, isSpaceFree } from "../../helpers/grid";
import { moveTowards } from "../../helpers/moveTowards";
import { DOWN, LEFT, RIGHT, UP } from "../../Input";
import { walls } from "../../levels/level1";
import { resources } from "../../Resource";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";
import {
  STAND_DOWN,
  STAND_LEFT,
  STAND_RIGHT,
  STAND_UP,
  WALK_DOWN,
  WALK_LEFT,
  WALK_RIGHT,
  WALK_UP,
} from "./heroAnimation";

export class Hero extends GameObject {
  constructor(x, y) {
    super({
      position: new Vector2(x, y),
    });
    console.log(this.position);

    const shadow = new Sprite({
      resource: resources.images.shadow,
      frameSize: new Vector2(32, 32),
      position: new Vector2(-4, -19),
      scale: 0.6,
    });

    this.addChild(shadow);

    this.body = new Sprite({
      resource: resources.images.unicorn,
      frameSize: new Vector2(17, 17),
      hFrames: 4,
      vFrames: 4,
      frame: 0,
      position: new Vector2(-4, -20),
      animations: new Animations({
        walkLeft: new FrameIndexPattern(WALK_LEFT),
        walkRight: new FrameIndexPattern(WALK_RIGHT),
        walkDown: new FrameIndexPattern(WALK_DOWN),
        walkUp: new FrameIndexPattern(WALK_UP),
        standRight: new FrameIndexPattern(STAND_RIGHT),
        standDown: new FrameIndexPattern(STAND_DOWN),
        standUp: new FrameIndexPattern(STAND_UP),
        standLeft: new FrameIndexPattern(STAND_LEFT),
      }),
    });
    this.addChild(this.body);
    this.facingDirection = DOWN;
    this.destinationPosition = this.position.duplicate();
  }
  step(_delta, root) {
    const distance = moveTowards(this, this.destinationPosition, 1);
    const hasArrived = distance <= 1;
    if (hasArrived) {
      this.tryMove(root);
    }

    this.tryEmitPosition();
  }

  tryEmitPosition() {
    events.emit("HERO_POSITION", this.position);
  }

  tryMove(root) {
    const { input } = root;

    if (!input.direction) {
      if (this.facingDirection === LEFT) {
        this.body.animations.play("standLeft");
      }
      if (this.facingDirection === RIGHT) {
        this.body.animations.play("standRight");
      }
      if (this.facingDirection === UP) {
        this.body.animations.play("standUp");
      }
      if (this.facingDirection === DOWN) {
        this.body.animations.play("standDown");
      }
      return;
    }

    let nextX = this.destinationPosition.x;
    let nextY = this.destinationPosition.y;

    const gridSize = 8;

    if (input.direction === DOWN) {
      nextY += gridSize;
      this.body.animations.play("walkDown");
    }
    if (input.direction === UP) {
      nextY -= gridSize;

      this.body.animations.play("walkUp");
    }
    if (input.direction === LEFT) {
      nextX -= gridSize;
      this.body.animations.play("walkLeft");
    }
    if (input.direction === RIGHT) {
      nextX += gridSize;
      this.body.animations.play("walkRight");
    }

    this.facingDirection = input.direction ?? this.facingDirection;
    if (isSpaceFree(walls, nextX, nextY)) {
      this.destinationPosition.x = nextX;
      this.destinationPosition.y = nextY;
    }
  }
}
