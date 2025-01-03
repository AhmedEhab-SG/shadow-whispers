import { ControlActions } from "../../../types/events";
import UI from "../UI";

class Windowed extends UI {
  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();

    this.textX = gameWidth ? gameWidth * 0.4 : 0;
    this.textY = gameHeight ? gameHeight * 0.7 : 0;
    this.text = "Windowed";
    this.color = "grey";
    this.shadowColor = "white";
    this.fontSize = 40;
    this.fontFamily = "Bangers, cursive";
  }
  public update({ controlActions }: { controlActions: ControlActions }): void {
    const isWindowed = !document.fullscreenElement;
    this.color = isWindowed ? "green" : "grey";

    if (isWindowed) return;

    this.shadowColor = "white";
    if (this.isHover(controlActions)) {
      this.color = "white";
      this.shadowColor = "grey";

      this.click(controlActions, () => {
        this.color = "black";
        this.shadowColor = "white";

        document.exitFullscreen().catch(() => {});
      });
    }
  }
}

export default Windowed;
