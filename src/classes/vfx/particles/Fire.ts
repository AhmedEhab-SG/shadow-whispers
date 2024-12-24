import Particle from "./Particle";
import fireImg from "../../../assets/imgs/vfx/fire.png";

class Fire extends Particle {
  private angle = 0;
  private va = Math.random() * 0.2 - 0.1;

  constructor(private targetX: number, private targetY: number) {
    super();
    this.loadImage(fireImg);
    this.init();
  }

  private init(): void {
    this.x = this.targetX;
    this.y = this.targetY;

    this.size = Math.random() * 100 + 30;

    this.vx = 1;
    this.vy = 0.7;
  }

  public update({ gameSpeed }: { gameSpeed: number }): void {
    super.update({ gameSpeed });

    this.angle += this.va;

    this.x += Math.sin(this.angle * 10);

    this.y += Math.random() * 2 - 1 - this.vy;

    this.fadeParticle();
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    if (!this.imgLoaded) return;

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(
      this.image,
      -this.size * 0.5,
      -this.size * 0.5,
      this.size,
      this.size
    );
    ctx.restore();
  }
}

export default Fire;
