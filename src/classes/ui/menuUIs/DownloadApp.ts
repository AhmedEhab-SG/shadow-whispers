import { ControlActions } from "../../../types/events";
import { GameStates } from "../../../types/game";
import UI from "../UI";

class DownloadApp extends UI {
  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();
    this.textX = gameWidth ? gameWidth * 0.0655 : 0;
    this.textY = gameHeight ? gameHeight * 0.985 : 0;
    this.text = "➜ Or click here to install the game as an application.📲";
    this.color = "white";
    this.shadowColor = "grey";
    this.fontSize = 16;
    this.fontFamily = "Arial";
    this.fontWeight = "bold";
    this.fontStyle = "italic";
  }

  public update({
    controlActions,
    gameStates,
  }: {
    controlActions: ControlActions;
    gameStates: GameStates;
  }): void {
    if (this.isHover(controlActions)) {
      this.color = "white";
      this.shadowColor = "none";

      this.click(
        controlActions,
        async () => await gameStates.showInstallPrompt()
      );
    } else {
      this.color = "rgb(136, 136, 255)";
      this.shadowColor = "none";
    }
  }
}

export default DownloadApp;
