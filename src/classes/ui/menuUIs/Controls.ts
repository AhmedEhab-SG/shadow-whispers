import GameStatus from "../../../config/GameStatus";
import { ControlActions } from "../../../types/events";
import { GameStates } from "../../../types/game";
import UI from "../UI";

class Controls extends UI {
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
    this.textY = gameHeight ? gameHeight * 0.725 : 0;
    this.text = "Controls";
    this.color = "grey";
    this.shadowColor = "white";
    this.fontSize = 45;
    this.fontFamily = "Bangers, cursive";
  }

  public update({
    controlActions,
    gameStates,
  }: {
    controlActions: ControlActions;
    gameStates: GameStates;
  }): void {
    this.textX = this.gameWidth
      ? this.gameWidth * 0.5 - this.textWidth * 0.5
      : 0;

    if (this.isHover(controlActions)) {
      this.color = "white";
      this.shadowColor = "grey";

      this.click(
        controlActions,
        () => (gameStates.status = GameStatus.CONTROLS)
      );
    } else {
      this.color = "grey";
      this.shadowColor = "white";
    }
  }
}

export default Controls;
