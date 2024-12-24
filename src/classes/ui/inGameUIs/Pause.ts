import GameStatus from "../../../config/GameStatus";
import { ControlActions } from "../../../types/events";
import { GameStates } from "../../../types/game";
import UI from "../UI";

class Pause extends UI {
  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();

    this.text = "Pause";
    this.textX = gameWidth ? gameWidth * 0.5 : 0;
    this.textY = gameHeight ? gameHeight * 0.05 : 0;
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
      this.shdowColor = "black";
      if (this.isClicked(controlActions)) {
        this.color = "white";
        this.shdowColor = "black";
        gameStates.status = GameStatus.PAUSED;
      }
    } else {
      this.color = "black";
      this.shdowColor = "white";
    }
  }
}

export default Pause;
