import UI from "../UI";
import { ControlActions } from "../../../types/events";

class FullScreen extends UI {
  private gameWidth?: number;

  public constructor({
    gameWidth,
    gameHeight,
  }: {
    canvas?: HTMLCanvasElement;
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super(); // Call the super constructor without arguments

    this.gameWidth = gameWidth;
    this.text = "Full Screen";
    this.textX = gameWidth ? gameWidth * 0.5 - 72 : 0;
    this.textY = gameHeight ? gameHeight * 0.65 : 0;
    this.fontSize = 30;
    this.fontFamily = "Bangers, cursive";
  }

  public update({ controlActions }: { controlActions: ControlActions }): void {
    if (document.fullscreenElement) {
      this.text = "Exit Full Screen";
      this.textX = this.gameWidth ? this.gameWidth * 0.5 - 95 : 0;
    } else {
      this.text = "Full Screen";
      this.textX = this.gameWidth ? this.gameWidth * 0.5 - 72 : 0;
    }

    if (this.isHover(controlActions)) {
      this.color = "white";
      this.shadowColor = "black";

      if (this.isClicked(controlActions)) {
        this.color = "grey";
        this.shadowColor = "black";

        if (document.fullscreenElement)
          document.exitFullscreen().catch(() => {});
        else document.documentElement?.requestFullscreen().catch(() => {});
      }
    } else {
      this.color = "black";
      this.shadowColor = "white";
    }
  }
}

export default FullScreen;
