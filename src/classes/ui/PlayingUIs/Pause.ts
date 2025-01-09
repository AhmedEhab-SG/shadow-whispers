import GameStatus from "../../../config/GameStatus";
import BaseKeys from "../../../enum/BaseKeys";
import { ControlActions } from "../../../types/events";
import { GameStates } from "../../../types/game";
import UI from "../UI";

class Pause extends UI {
  private gameWidth?: number;
  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();

    this.text = "Pause";
    this.gameWidth = gameWidth;
    this.textY = gameHeight ? gameHeight * 0.05 : 0;
    this.fontFamily = "Bangers, cursive";
  }

  public update({
    controlActions,
    gameStates,
    keys,
  }: {
    controlActions: ControlActions;
    gameStates: GameStates;
    keys: BaseKeys[];
  }): void {
    this.textX = this.gameWidth
      ? this.gameWidth * 0.7 - this.textWidth * 0.5
      : 0;

    if (keys.includes(BaseKeys.ESC) && gameStates.status === GameStatus.PLAYING)
      gameStates.status = GameStatus.PAUSED;

    if (this.isHover(controlActions)) {
      this.color = "white";
      this.shadowColor = "black";

      this.click(controlActions, () => (gameStates.status = GameStatus.PAUSED));
    } else {
      this.color = "black";
      this.shadowColor = "white";
    }
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    super.draw(ctx);

    super.draw(ctx);
    // Draw a line under the text
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(this.textX, this.textY + 5);
    ctx.lineTo(this.textX + this.textWidth, this.textY + 5);
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.color;
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }
}

export default Pause;
