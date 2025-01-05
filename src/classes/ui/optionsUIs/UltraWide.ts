import AspectRatio from "../../../enum/AspectRatio";
import { ControlActions } from "../../../types/events";
import { GameStates } from "../../../types/game";
import UI from "../UI";

class UltraWide extends UI {
  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();

    this.textX = gameWidth ? gameWidth * 0.4 : 0;
    this.textY = gameHeight ? gameHeight * 0.55 : 0;
    this.text = "Ultra Wide";
    this.color = "grey";
    this.shadowColor = "white";
    this.fontSize = 40;
    this.fontFamily = "Bangers, cursive";
  }
  public update({
    controlActions,
    gameStates,
  }: {
    controlActions: ControlActions;
    gameStates: GameStates;
  }): void {
    const isAspectUltraWideScreen =
      gameStates.aspectRatio === AspectRatio.ULTRA_WIDE_SCREEN;

    this.color = isAspectUltraWideScreen ? "green" : "grey";
    this.shadowColor = "white";

    if (isAspectUltraWideScreen) return;

    if (this.isHover(controlActions)) {
      this.color = "white";
      this.shadowColor = "grey";

      this.click(
        controlActions,
        () => (gameStates.aspectRatio = AspectRatio.ULTRA_WIDE_SCREEN)
      );
    }
  }
}

export default UltraWide;
