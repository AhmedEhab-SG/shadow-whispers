import {
  PlayingUIInstance,
  MenuUIInstance,
  PauseUIInstance,
} from "../../types/ui.ts";
import Energy from "./PlayingUIs/Energy.ts";
import Lives from "./PlayingUIs/Lives.ts";
import Pause from "./PlayingUIs/Pause.ts";
import Score from "./PlayingUIs/Score.ts";
import Time from "./PlayingUIs/Time.ts";
import Exit from "./menuUIs/Exit.ts";
import Name from "./menuUIs/Name.ts";
import Start from "./menuUIs/Start.ts";
import Died from "./overUIs/Died.ts";
import ExitGame from "./overUIs/ExitGame.ts";
import GameOver from "./overUIs/GameOver.ts";
import MainMenu from "./overUIs/MainMenu.ts";
import RestartLevel from "./overUIs/RestartLevel.ts";
import Menu from "./pauseUIs/Menu.ts";
import Paused from "./pauseUIs/Paused.ts";
import Restart from "./pauseUIs/Restart.ts";
import Resume from "./pauseUIs/Resume.ts";

class UI {
  public static readonly PlayingUIs = [Energy, Score, Time, Lives, Pause];
  public static readonly MenuUIs = [Name, Start, Exit];
  public static readonly PauseUI = [Paused, Resume, Restart, Menu];
  public static readonly OverUIs = [
    GameOver,
    Died,
    RestartLevel,
    MainMenu,
    ExitGame,
  ];

  private gameWidth: number | undefined;
  private timeLimit: number | undefined;
  private gameHeight: number | undefined;

  public constructor({
    gameWidth,
    gameHeight,
    timeLimit,
  }: {
    gameWidth?: number;
    gameHeight?: number;
    timeLimit?: number;
  }) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.timeLimit = timeLimit;
  }

  public getAllPlayingUIs(): PlayingUIInstance[] {
    return UI.PlayingUIs.map(
      (InGameUI) =>
        new InGameUI({
          gameWidth: this.gameWidth,
          timeLimit: this.timeLimit,
          gameHeight: this.gameHeight,
        })
    );
  }

  public getAllMenuUIs(): MenuUIInstance[] {
    return UI.MenuUIs.map(
      (MenuUI) =>
        new MenuUI({ gameWidth: this.gameWidth, gameHeight: this.gameHeight })
    );
  }

  public getAllPauseUI(): PauseUIInstance[] {
    return UI.PauseUI.map(
      (PauseUI) =>
        new PauseUI({
          gameWidth: this.gameWidth,
          gameHeight: this.gameHeight,
        })
    );
  }

  public getAllOverUIs(): PauseUIInstance[] {
    return UI.OverUIs.map(
      (OverUI) =>
        new OverUI({
          gameWidth: this.gameWidth,
          gameHeight: this.gameHeight,
        })
    );
  }
}

export default UI;
