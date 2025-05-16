import { events } from "../../Events";
import { GameObject } from "../../GameObject";
import { resources } from "../../Resource";
import { Sprite } from "../../Sprite";
import { Vector2 } from "../../Vector2";

export class Rod extends GameObject {
  constructor(x, y) {
    super({
      position: new Vector2(x, y),
    });
    const sprite = new Sprite({
      resource: resources.images.rod,
      scale: 1,
      position: new Vector2(0, -20),
    });
    this.addChild(sprite);
    events.on("HERO_POSITION", this, (pos) => {
      console.log("rod", this.position.x, this.position.y);
      const roundedHeroX = Math.round(pos.x);
      const roundedHeroY = Math.round(pos.y);
      if (
        roundedHeroX === this.position.x &&
        roundedHeroY === this.position.y
      ) {
        this.onCollideWithHero();
      }
    });
  }

  onCollideWithHero() {
    this.destroy();

    events.emit("HERO_PICKS_UP_ITEM", {
      image: resources.images.rod,
      position: this.position,
    });
  }
}
