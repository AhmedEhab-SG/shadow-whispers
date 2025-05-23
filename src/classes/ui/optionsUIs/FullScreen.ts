import { ControlActions } from "../../../types/events";
import UI from "../UI";

class FullScreen extends UI {
  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();

    this.textX = gameWidth ? gameWidth * 0.6 : 0;
    this.textY = gameHeight ? gameHeight * 0.7 : 0;
    this.text = "Full Screen";
    this.color = "grey";
    this.shadowColor = "white";
    this.fontSize = 35;
    this.fontFamily = "Bangers, cursive";
  }
  public update({ controlActions }: { controlActions: ControlActions }): void {
    const isFullScreen = document.fullscreenElement;
    this.color = isFullScreen ? "green" : "grey";
    this.shadowColor = "white";

    if (isFullScreen) return;

    this.shadowColor = "white";
    if (this.isHover(controlActions)) {
      this.color = "white";
      this.shadowColor = "grey";

      this.click(controlActions, () =>
        document.documentElement?.requestFullscreen().catch(() => {})
      );
    }
  }
}

export default FullScreen;
