import UI from "../UI";

class OptionsName extends UI {
  private gameWidth?: number;

  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();

    this.gameWidth = gameWidth;
    this.textY = gameHeight ? gameHeight * 0.37 : 0;
    this.text = "Options";
    this.color = "white";
    this.shadowColor = "grey";
    this.fontSize = 50;
    this.fontFamily = "Bangers, cursive";
  }

  public update({}: {}): void {
    this.textX = this.gameWidth
      ? this.gameWidth * 0.5 - this.textWidth * 0.5
      : 0;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    super.draw(ctx);
    // Draw a line under the text
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(this.textX, this.textY + 15);
    ctx.lineTo(this.textX + this.textWidth, this.textY + 15);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "grey";
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }
}

export default OptionsName;
