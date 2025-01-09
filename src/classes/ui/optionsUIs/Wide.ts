import AspectRatio from "../../../enum/AspectRatio";
import { ControlActions } from "../../../types/events";
import { GameStates } from "../../../types/game";
import UI from "../UI";

class Wide extends UI {
  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();

    this.textX = gameWidth ? gameWidth * 0.6 : 0;
    this.textY = gameHeight ? gameHeight * 0.55 : 0;
    this.text = "Wide";
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
    const isAspectWideScreen =
      gameStates.aspectRatio === AspectRatio.WIDE_SCREEN;

    this.color = isAspectWideScreen ? "green" : "grey";
    this.shadowColor = "white";

    if (isAspectWideScreen) return;

    if (this.isHover(controlActions)) {
      this.color = "white";
      this.shadowColor = "grey";

      this.click(
        controlActions,
        () => (gameStates.aspectRatio = AspectRatio.WIDE_SCREEN)
      );
    }
  }
}

export default Wide;
