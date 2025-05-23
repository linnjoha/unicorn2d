class Resources {
  constructor() {
    this.toLoad = {
      sky: "/sprites/sky.png",
      ground: "/sprites/ground.png",
      hero: "/sprites/hero-sheet.png",
      unicorn: "/sprites/unicorn.png",
      rainbow: "/sprites/rainbow.png",
      shadow: "/sprites/shadow.png",
      rod: "/sprites/watermelon.png",
    };

    this.images = {};

    Object.keys(this.toLoad).forEach((key) => {
      const img = new Image();
      img.src = this.toLoad[key];
      this.images[key] = {
        image: img,
        isLoaded: false,
      };
      img.onload = () => {
        this.images[key].isLoaded = true;
      };
    });
  }
}

export const resources = new Resources();
