import { InGameUIInstance, MenuUIInstance } from "../../types/ui.ts";
import Energy from "./inGameUIs/Energy.ts";
import Lives from "./inGameUIs/Lives.ts";
import Score from "./inGameUIs/Score.ts";
import Time from "./inGameUIs/Time.ts";

class UI {
  public static readonly InGameUIs = [Energy, Score, Time, Lives];
  public static readonly MenuUIs = [];

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

  public getAllInGameUIs(): InGameUIInstance[] {
    return UI.InGameUIs.map(
      (InGameUI) =>
        new InGameUI({ gameWidth: this.gameWidth, timeLimit: this.timeLimit })
    );
  }

  public getAllMenuUIs(): MenuUIInstance[] {
    return UI.MenuUIs.map((MenuUI) =>  MenuUI);
  }
}

export default UI;
