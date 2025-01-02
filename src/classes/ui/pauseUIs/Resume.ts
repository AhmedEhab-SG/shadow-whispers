import GameStatus from "../../../config/GameStatus";
import { ControlActions } from "../../../types/events";
import { GameStates } from "../../../types/game";
import UI from "../UI";

class Resume extends UI {
  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();

    this.text = "Resume";
    this.textX = gameWidth ? gameWidth * 0.5 - 50 : 0;
    this.textY = gameHeight ? gameHeight * 0.45 : 0;
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

        gameStates.status = GameStatus.PLAYING;
      }
    } else {
      this.color = "rgb(50,205,50)";
      this.shadowColor = "black";
    }
  }
}

export default Resume;
