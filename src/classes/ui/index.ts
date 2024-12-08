import { InGameUIInstance } from "../../types/ui.ts";
import Energy from "./Energy";
import Lives from "./Lives";
import Score from "./Score";
import Time from "./Time";

class UI {
  public static readonly InGameUI = [Energy, Score, Time, Lives];

  private gameWidth: number;
  private timeLimit: number;

  public constructor({
    gameWidth,
    timeLimit,
  }: {
    gameWidth: number;
    timeLimit: number;
  }) {
    this.gameWidth = gameWidth;
    this.timeLimit = timeLimit;
  }

  public getAllInGameUI(): InGameUIInstance[] {
    return UI.InGameUI.map(
      (UI) => new UI({ gameWidth: this.gameWidth, timeLimit: this.timeLimit })
    );
  }
}

export default UI;
