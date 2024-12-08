import UI from "./UI";
import heartImg from "../../assets/imgs/ui/heart.png";

class Lives extends UI {
  private lives: number = 0;

  public constructor() {
    super();
    this.textX = 15;
    this.textY = 35;
    this.imgSize = 25;
    this.imgX = this.textX + this.imgSize + 80;
    this.imgY = this.textY - this.imgSize + 2;
    this.image.src = heartImg;
  }

  public update({ hero }: { hero: { lives: number } }): void {
    this.lives = hero.lives;
    this.text = `Lives: x${this.lives}`;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    super.draw(ctx);

    if (this.lives > 5) {
      this.drawImg = true;
      return;
    } else this.drawImg = false;

    for (let i = 0; i < this.lives; i++) {
      ctx.drawImage(
        this.image,
        this.imgX + i * this.imgSize * 1.1,
        this.imgY,
        this.imgSize,
        this.imgSize
      );
    }
  }
}

export default Lives;
