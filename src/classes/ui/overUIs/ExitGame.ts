import { ControlActions } from "../../../types/events";
import UI from "../UI";

class ExitGame extends UI {
  private gameWidth?: number;

  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();

    this.text = "Exit Game";
    this.gameWidth = gameWidth;
    this.textY = gameHeight ? gameHeight * 0.55 : 0;
    this.fontSize = 30;
    this.fontFamily = "Bangers, cursive";
  }

  public update({ controlActions }: { controlActions: ControlActions }): void {
    this.textX = this.gameWidth
      ? this.gameWidth * 0.7 - this.textWidth * 0.5
      : 0;

    if (this.isHover(controlActions)) {
      this.color = "white";
      this.shadowColor = "black";

      this.click(controlActions, () => close());
    } else {
      this.color = "black";
      this.shadowColor = "white";
    }
  }
}

export default ExitGame;
