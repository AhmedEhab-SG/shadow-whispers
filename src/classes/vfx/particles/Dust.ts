import Particle from "./Particle";

class Dust extends Particle {
  private color = "rgba(40, 40, 40, 0.3)";

  constructor(private targetX: number, private targetY: number) {
    super();
    this.init();
  }

  private init(): void {
    this.x = this.targetX;
    this.y = this.targetY;

    this.size = Math.random() * 10 + 5;
    this.vx = Math.random() * 2 - 1;
    this.vy = Math.random() * 2 - 1;
  }

  public update({ gameSpeed }: { gameSpeed: number }): void {
    super.update({ gameSpeed });
    this.size *= 0.95;
    this.y -= this.vy;

    this.fadeParticle();
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

export default Dust;
