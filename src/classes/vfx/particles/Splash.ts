import Particle from "./Particle";
import fireImg from "../../../assets/imgs/vfx/fire.png";

class Splash extends Particle {
  constructor(
    private targetX: number,
    private targetY: number,
    private gravity: number
  ) {
    super();
    this.loadImage(fireImg);
    this.init();
  }

  private init(): void {
    this.x = this.targetX;
    this.y = this.targetY;

    this.size = Math.random() * 100 + 100;

    this.x -= this.size * 0.7; // offset
    this.y -= this.size * 0.7; // offset

    this.vx = Math.random() * 4 - 2; // random x velocity
    this.vy = Math.random() * 2 + 2; // random y velocity
  }

  public update({ gameSpeed }: { gameSpeed: number }): void {
    super.update({ gameSpeed });

    this.gravity += 0.1;

    this.vy += this.gravity;

    this.fadeParticle();
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    if (!this.imgLoaded) return;

    ctx.save();
    ctx.drawImage(this.image, this.x, this.y, this.size, this.size);
    ctx.restore();
  }
}

export default Splash;
