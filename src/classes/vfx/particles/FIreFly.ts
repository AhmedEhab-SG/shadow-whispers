import Particle from "./Particle";

class FireFly extends Particle {
  private baseColor = "rgba(61, 107, 117, ";
  private alpha = 0.5;
  private fadeSpeed = Math.random() * 0.01 + 0.005; // Random fade speed for each firefly
  private fadeInit = true;

  public constructor(private gameWidth: number, private gameHeight: number) {
    super();
    this.init();
  }

  private init(): void {
    this.x = Math.random() * this.gameWidth;
    this.y = Math.random() * this.gameHeight;
    this.size = Math.random() * 3 + 10;
    this.vx = Math.random() * 0.1 - 0.05;
    this.vy = Math.random() * 0.1 - 0.05;
  }

  public update(): void {
    this.x += this.vx;
    this.y += this.vy;

    // Check if the particle goes outside the width
    if (this.x > this.gameWidth) {
      this.x = 0;
    } else if (this.x < 0) {
      this.x = this.gameWidth;
    }

    // fade in/out effect
    if (this.fadeInit) {
      this.alpha += this.fadeSpeed;
      if (this.alpha >= 1.2) this.fadeInit = false;
    } else {
      this.alpha -= this.fadeSpeed;
      if (this.alpha <= 0.5) this.fadeInit = true;
    }
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.beginPath();

    // Create a radial gradient (inner circle is brighter)
    const gradient = ctx.createRadialGradient(
      this.x,
      this.y,
      this.size * 0.1,
      this.x,
      this.y,
      this.size
    );
    gradient.addColorStop(0, `${this.baseColor}${this.alpha})`);
    gradient.addColorStop(1, `${this.baseColor}0)`);

    // Set shadow properties to create a glow effect
    ctx.shadowBlur = 5;
    ctx.shadowColor = `${this.baseColor}${this.alpha})`;

    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.restore();
  }
}

export default FireFly;
