import GameStatus from "../../../config/GameStatus";
import { ControlActions } from "../../../types/events";
import { GameStates } from "../../../types/game";
import UI from "../UI";

class NextLevel extends UI {
  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();

    this.text = "Next Level";
    this.textX = gameWidth ? gameWidth * 0.45 : 0;
    this.textY = gameHeight ? gameHeight * 0.55 : 0;
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
    if (this.isHover(controlActions)) {
      this.color = "white";
      this.shadowColor = "black";

      this.click(controlActions, () => {
        this.color = "grey";
        this.shadowColor = "black";

        gameStates.status = GameStatus.NEXT_LEVEL;
      });
    } else {
      this.color = "rgb(50,205,50)";
      this.shadowColor = "black";
    }
  }
}

export default NextLevel;
