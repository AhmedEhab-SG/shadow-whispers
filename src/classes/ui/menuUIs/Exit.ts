import { ControlActions } from "../../../types/events";
import UI from "../UI";

class Exit extends UI {
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
    this.textY = gameHeight ? gameHeight * 0.825 : 0;
    this.text = "Exit";
    this.color = "grey";
    this.shadowColor = "white";
    this.fontSize = 45;
    this.fontFamily = "Bangers, cursive";
  }

  public update({ controlActions }: { controlActions: ControlActions }): void {
    this.textX = this.gameWidth
      ? this.gameWidth * 0.5 - this.textWidth * 0.5
      : 0;
    if (this.isHover(controlActions)) {
      this.color = "white";
      this.shadowColor = "grey";

      this.click(controlActions, () => close());
    } else {
      this.color = "grey";
      this.shadowColor = "white";
    }
  }
}

export default Exit;
