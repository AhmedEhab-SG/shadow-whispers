import GameStatus from "../../../config/GameStatus";
import { ControlActions } from "../../../types/events";
import { GameStates } from "../../../types/game";
import UI from "../UI";

class MenuOver extends UI {
  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();

    this.text = "Main Menu";
    this.textX = gameWidth ? gameWidth * 0.28 : 0;
    this.textY = gameHeight ? gameHeight * 0.55 : 0;
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

        gameStates.status = GameStatus.MENU;
      }
    } else {
      this.color = "black";
      this.shadowColor = "white";
    }
  }
}

export default MenuOver;
