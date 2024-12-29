import GameStatus from "../../../config/GameStatus";
import { GameStates } from "../../../types/game";
import UI from "../UI";

class Reason extends UI {
  private gameWidth: number;

  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();
    this.gameWidth = gameWidth ? gameWidth : 0;
    this.textY = gameHeight ? gameHeight * 0.35 : 0;
    this.fontSize = 60;
    this.shadowColor = "rgb(0,0,0)";
  }

  public update({ gameStates }: { gameStates: GameStates }): void {
    if (gameStates.status === GameStatus.OVER) {
      this.text = "You Died!";
      this.color = "rgb(168, 0, 0)";
      this.textX = this.gameWidth ? this.gameWidth * 0.5 - 110 : 0;
      this.fontFamily = "Bangers, cursive";
    }
    if (gameStates.status === GameStatus.TIMES_UP) {
      this.text = "Times Up!";
      this.textX = this.gameWidth ? this.gameWidth * 0.5 - 110 : 0;
      this.color = "rgb(168, 165, 0)";
      this.fontFamily = "Bangers, cursive";
    }
  }
}

export default Reason;
