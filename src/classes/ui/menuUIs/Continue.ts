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
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();

    this.gameWidth = gameWidth;
    this.textY = gameHeight ? gameHeight * 0.375 : 0;
    this.color = "grey";
    this.shadowColor = "white";
    this.fontSize = 45;
    this.fontFamily = "Bangers, cursive";
  }

  private hide(): void {
    this.text = "";
  }

  private show(): void {
    this.text = "Continue";
  }

  public update({
    controlActions,
    gameStates,
    gameSave,
  }: {
    controlActions: ControlActions;
    gameStates: GameStates;
    gameSave: GameSave | null;
  }): void {
    if (!gameSave) return this.hide();
    else this.show();

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
