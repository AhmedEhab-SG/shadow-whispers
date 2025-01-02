import UI from "../UI";
import DefaultKeys from "../../../enum/BaseKeys";
import { ControlActions } from "../../../types/events";

class Attack extends UI {
  private x: number;
  private y: number;
  private size: number = 80;

  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();

    this.text = "Attack";
    this.x = gameWidth ? gameWidth - 50 - 100 : 0;
    this.y = gameHeight ? gameHeight - 110 : 0;
    this.fontSize = 25;
    this.fontFamily = "Bangers, cursive";
  }

  public update({
    keys,
    controlActions,
  }: {
    keys: DefaultKeys[];
    controlActions: ControlActions;
  }): void {
    if (!this.isMobileDevice()) return;

    if (
      controlActions.touches.some(
        ({ x, y }) =>
          Math.sqrt(
            (x - (this.x + this.size / 2)) ** 2 +
              (y - (this.y + this.size / 2)) ** 2
          ) <=
          this.size / 2
      )
    ) {
      this.color = "red";

      if (!keys.includes(DefaultKeys.ACTION)) keys.push(DefaultKeys.ACTION);

      return;
    }

    this.color = "white";
    if (keys.includes(DefaultKeys.ACTION)) {
      keys.splice(keys.indexOf(DefaultKeys.ACTION), 1);
    }
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    if (!this.isMobileDevice()) return;

    ctx.save();
    ctx.beginPath();
    ctx.arc(
      this.x + this.size / 2,
      this.y + this.size / 2,
      this.size / 2,
      0,
      Math.PI * 2
    );
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.closePath();

    ctx.font = `${this.fontSize}px ${this.fontFamily}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = this.color;
    ctx.fillText(this.text, this.x + this.size / 2, this.y + this.size / 2);
    ctx.restore();
  }
}

export default Attack;
