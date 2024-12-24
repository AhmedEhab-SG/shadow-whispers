import { ControlActions } from "../../../types/events";
import UI from "../UI";

class Exit extends UI {
  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();

    this.textX = gameWidth ? gameWidth * 0.455 : 0;
    this.textY = gameHeight ? gameHeight * 0.65 : 0;
    this.text = "Exit";
    this.color = "grey";
    this.shdowColor = "white";
    this.fontSize = 55;
    this.fontFamily = "Bangers, cursive";
  }

  public update({ controlActions }: { controlActions: ControlActions }): void {
    if (this.isHover(controlActions)) {
      this.color = "white";
      this.shdowColor = "grey";

      if (this.isClicked(controlActions)) {
        this.color = "grey";
        this.shdowColor = "white";

        close();
      }
    } else {
      this.color = "grey";
      this.shdowColor = "white";
    }
  }
}

export default Exit;
