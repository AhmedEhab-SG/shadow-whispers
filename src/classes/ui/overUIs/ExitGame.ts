import { ControlActions } from "../../../types/events";
import UI from "../UI";

class ExitGame extends UI {
  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();

    this.text = "Exit Game";
    this.textX = gameWidth ? gameWidth * 0.45 : 0;
    this.textY = gameHeight ? gameHeight * 0.55 : 0;
    this.fontSize = 30;
    this.fontFamily = "Bangers, cursive";
  }

  public update({ controlActions }: { controlActions: ControlActions }): void {
    if (this.isHover(controlActions)) {
      this.color = "white";
      this.shadowColor = "black";

      if (this.isClicked(controlActions)) {
        this.color = "grey";
        this.shadowColor = "black";

        close();
      }
    } else {
      this.color = "black";
      this.shadowColor = "white";
    }
  }
}

export default ExitGame;
