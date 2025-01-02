import UI from "../UI";

class OptionsName extends UI {
  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();

    this.textX = gameWidth ? gameWidth * 0.5 - 75 : 0;
    this.textY = gameHeight ? gameHeight * 0.37 : 0;
    this.text = "Options";
    this.color = "white";
    this.shadowColor = "grey";
    this.fontSize = 50;
    this.fontFamily = "Bangers, cursive";
  }

  public update({}: {}): void {}

  public draw(ctx: CanvasRenderingContext2D): void {
    super.draw(ctx);
    // Draw a line under the text
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(this.textX, this.textY + 15);
    ctx.lineTo(this.textX + 140, this.textY + 15);
    ctx.lineWidth = 5;
    ctx.strokeStyle = "grey";
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }
}

export default OptionsName;
