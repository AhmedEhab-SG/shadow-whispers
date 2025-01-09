import GameStatus from "../../../config/GameStatus";
import { ControlActions } from "../../../types/events";
import { GameStates } from "../../../types/game";
import { GameSave } from "../../../types/save";
import UI from "../UI";

class Continue extends UI {
  private gameWidth?: number;

  public constructor({
    gameWidth,
    gameHeight,
    gameSave,
  }: {
    gameWidth?: number;
    gameHeight?: number;
    gameSave?: GameSave | null;
  }) {
    super();

    if (!gameSave) return;

    this.gameWidth = gameWidth;
    this.textY = gameHeight ? gameHeight * 0.375 : 0;
    this.text = "Continue";
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
        () => (gameStates.status = GameStatus.CONTINUE)
      );
    } else {
      this.color = "grey";
      this.shadowColor = "white";
    }
  }
}

export default Continue;
