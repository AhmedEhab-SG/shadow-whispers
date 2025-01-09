import AspectRatio from "../../../enum/AspectRatio";
import { ControlActions } from "../../../types/events";
import { GameStates } from "../../../types/game";
import UI from "../UI";

class Full extends UI {
  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();

    this.textX = gameWidth ? gameWidth * 0.73 : 0;
    this.textY = gameHeight ? gameHeight * 0.55 : 0;
    this.text = "Square";
    this.color = "grey";
    this.shadowColor = "white";
    this.fontSize = 35;
    this.fontFamily = "Bangers, cursive";
  }
  public update({
    controlActions,
    gameStates,
  }: {
    controlActions: ControlActions;
    gameStates: GameStates;
  }): void {
    const isAspectRatioFullScreen =
      gameStates.aspectRatio === AspectRatio.FULL_SCREEN;

    this.color = isAspectRatioFullScreen ? "green" : "grey";
    this.shadowColor = "white";

    if (isAspectRatioFullScreen) return;

    if (this.isHover(controlActions)) {
      this.color = "white";
      this.shadowColor = "grey";

      this.click(
        controlActions,
        () => (gameStates.aspectRatio = AspectRatio.FULL_SCREEN)
      );
    }
  }
}

export default Full;
