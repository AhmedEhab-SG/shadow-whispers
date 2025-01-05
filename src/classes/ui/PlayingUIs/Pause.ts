import GameStatus from "../../../config/GameStatus";
import BaseKeys from "../../../enum/BaseKeys";
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
    this.textX = gameWidth ? gameWidth * 0.6 : 0;
    this.textY = gameHeight ? gameHeight * 0.05 : 0;
    this.fontFamily = "Bangers, cursive";
  }

  public update({
    controlActions,
    gameStates,
    keys,
  }: {
    controlActions: ControlActions;
    gameStates: GameStates;
    keys: BaseKeys[];
  }): void {
    if (keys.includes(BaseKeys.ESC) && gameStates.status === GameStatus.PLAYING)
      gameStates.status = GameStatus.PAUSED;

    if (this.isHover(controlActions)) {
      this.color = "white";
      this.shadowColor = "black";

      this.click(controlActions, () => (gameStates.status = GameStatus.PAUSED));
    } else {
      this.color = "black";
      this.shadowColor = "white";
    }
  }
}

export default Pause;
