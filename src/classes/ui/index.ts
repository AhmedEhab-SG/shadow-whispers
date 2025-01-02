import {
  PlayingUIInstance,
  MenuUIInstance,
  PauseUIInstance,
  OverUIInstance,
  NextUIInstance,
  MobileUIInstance,
} from "../../types/ui.ts";
import Energy from "./PlayingUIs/Energy.ts";
import Level from "./PlayingUIs/Level.ts";
import Lives from "./PlayingUIs/Lives.ts";
import Pause from "./PlayingUIs/Pause.ts";
import Score from "./PlayingUIs/Score.ts";
import Time from "./PlayingUIs/Time.ts";
import Exit from "./menuUIs/Exit.ts";
import Name from "./menuUIs/Name.ts";
import Start from "./menuUIs/Start.ts";
import NextLevel from "./nextUIs/NextLevel.ts";
import Win from "./nextUIs/Win.ts";
import Reason from "./overUIs/Reason.ts";
import ExitGame from "./overUIs/ExitGame.ts";
import GameOver from "./overUIs/GameOver.ts";
import MainMenu from "./overUIs/MainMenu.ts";
import RestartLevel from "./overUIs/RestartLevel.ts";
import Menu from "./pauseUIs/Menu.ts";
import Paused from "./pauseUIs/Paused.ts";
import Restart from "./pauseUIs/Restart.ts";
import Resume from "./pauseUIs/Resume.ts";
import RestartLevelPS from "./pauseUIs/RestartLevelPS.ts";
import Controls from "./menuUIs/Controls.ts";
import CopyRight from "./menuUIs/CopyRight.ts";
import JoyStick from "./mobile/joystick/index.ts";
import Attack from "./mobile/Attack.ts";
import FullScreen from "./pauseUIs/FullScreen.ts";

class UI {
  public static readonly MenuUIs = [Name, Start, Exit, Controls, CopyRight];
  public static readonly PlayingUIs = [
    Energy,
    Score,
    Time,
    Lives,
    Pause,
    Level,
  ];
  public static readonly PauseUI = [
    Paused,
    Resume,
    Restart,
    RestartLevelPS,
    FullScreen,
    Menu,
  ];
  public static readonly OverUIs = [
    GameOver,
    Reason,
    RestartLevel,
    MainMenu,
    ExitGame,
  ];
  public static readonly NextUIs = [NextLevel, Win, ExitGame, MainMenu];

  public static readonly MobileUIs = [JoyStick, Attack];

  private gameWidth?: number;
  private gameHeight?: number;

  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }

  public getAllPlayingUIs(): PlayingUIInstance[] {
    return UI.PlayingUIs.map(
      (InGameUI) =>
        new InGameUI({
          gameWidth: this.gameWidth,
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

  public getAllOverUIs(): OverUIInstance[] {
    return UI.OverUIs.map(
      (OverUI) =>
        new OverUI({
          gameWidth: this.gameWidth,
          gameHeight: this.gameHeight,
        })
    );
  }

  public getAllNextUIs(): NextUIInstance[] {
    return UI.NextUIs.map(
      (NextUI) =>
        new NextUI({
          gameWidth: this.gameWidth,
          gameHeight: this.gameHeight,
        })
    );
  }

  public getAllMobileUIs({
    x,
    y,
    radius,
    handleRadius,
    handleColor,
    handleFriction,
    originColor,
    touchThreshold,
  }: {
    x?: number;
    y?: number;
    radius?: number;
    handleRadius?: number;
    handleColor?: string;
    handleFriction?: number;
    originColor?: string;
    touchThreshold?: number;
  } = {}): MobileUIInstance[] {
    return UI.MobileUIs.map(
      (MobileUI) =>
        new MobileUI({
          x,
          y,
          radius,
          handleRadius,
          handleFriction,
          touchThreshold,
          handleColor,
          originColor,
          gameWidth: this.gameWidth,
          gameHeight: this.gameHeight,
        })
    );
  }
}

export default UI;
