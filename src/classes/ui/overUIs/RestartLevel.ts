import GameStatus from "../../../config/GameStatus";
import { ControlActions } from "../../../types/events";
import { GameStates } from "../../../types/game";
import UI from "../UI";

class RestartLevel extends UI {
  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();

    this.text = "Restart Level";
    this.textX = gameWidth ? gameWidth * 0.3 : 0;
    this.textY = gameHeight ? gameHeight * 0.5 : 0;
    this.fontSize = 30;
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
      this.shadowColor = "black";

      if (this.isClicked(controlActions)) {
        this.color = "grey";
        this.shadowColor = "black";

        gameStates.status = GameStatus.RESTART_LEVEL;
      }
    } else {
      this.color = "black";
      this.shadowColor = "white";
    }
  }
}

export default RestartLevel;
