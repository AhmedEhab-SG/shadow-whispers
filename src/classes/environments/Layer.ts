import Sprite from "../../utils/Sprite";

class Layer extends Sprite {
  private x = 0;
  private y = 0;

  constructor(
    private imageSrc: string,
    private width: number,
    private height: number,
    private speedMod: number
  ) {
    super();
    this.loadImage(this.imageSrc);
  }

  update({ gameSpeed = 0 }) {
    this.x -= gameSpeed * this.speedMod;
    if (this.x < -this.width) {
      this.x += this.width;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.imgLoaded) return;

    // Draw the image twice to create a seamless infinite scroll effect
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

    ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );

    // // If the first image goes off-screen, draw another one to the left
    // if (this.x < 0) {
    //   ctx.drawImage(
    //     this.image,
    //     this.x + this.image.width * 2,
    //     this.y,
    //     this.image.width,
    //     this.height
    //   );
    // }
  }
}

export default Layer;
