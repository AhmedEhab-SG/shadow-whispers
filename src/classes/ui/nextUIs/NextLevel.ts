import GameStatus from "../../../config/GameStatus";
import { ControlActions } from "../../../types/events";
import { GameStates } from "../../../types/game";
import UI from "../UI";

class NextLevel extends UI {
  private gameWidth?: number;

  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();

    this.text = "Next Level";
    this.gameWidth = gameWidth;
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
    this.textX = this.gameWidth
      ? this.gameWidth * 0.5 - this.textWidth * 0.5
      : 0;

    if (this.isHover(controlActions)) {
      this.color = "white";
      this.shadowColor = "black";

      this.click(
        controlActions,
        () => (gameStates.status = GameStatus.NEXT_LEVEL)
      );
    } else {
      this.color = "rgb(50,205,50)";
      this.shadowColor = "black";
    }
  }
}

export default NextLevel;
