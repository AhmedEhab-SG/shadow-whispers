import GameStatus from "../../../config/GameStatus";
import { ControlActions } from "../../../types/events";
import { GameStates } from "../../../types/game";
import UI from "../UI";

class Controls extends UI {
  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();

    this.textX = gameWidth ? gameWidth * 0.41 : 0;
    this.textY = gameHeight ? gameHeight * 0.7 : 0;
    this.text = "Controls";
    this.color = "grey";
    this.shadowColor = "white";
    this.fontSize = 55;
    this.fontFamily = "Bangers, cursive";
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
      this.shadowColor = "grey";

      if (this.isClicked(controlActions)) {
        this.color = "grey";
        this.shadowColor = "white";

        gameStates.status = GameStatus.CONTROLS;
      }
    } else {
      this.color = "grey";
      this.shadowColor = "white";
    }
  }
}

export default Controls;
