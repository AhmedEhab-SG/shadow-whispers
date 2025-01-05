import {
  PlayingUIInstance,
  MenuUIInstance,
  PauseUIInstance,
  OverUIInstance,
  NextUIInstance,
  MobileUIInstance,
  OptionsUIInstance,
  ControlsUIInstance,
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
import Restart from "./overUIs/Restart.ts";
import Menu from "./pauseUIs/Menu.ts";
import Paused from "./pauseUIs/Paused.ts";
import RestartPs from "./pauseUIs/RestartPS.ts";
import Resume from "./pauseUIs/Resume.ts";
import Controls from "./menuUIs/Controls.ts";
import CopyRight from "./menuUIs/CopyRight.ts";
import JoyStick from "./mobile/joystick/index.ts";
import Attack from "./mobile/Attack.ts";
import FullScreen from "./pauseUIs/FullScreen.ts";
import Options from "./menuUIs/Options.ts";
import OptionsName from "./optionsUIs/OptionsName.ts";
import ScreenAspect from "./optionsUIs/ScreenAspect.ts";
import UltraWide from "./optionsUIs/UltraWide.ts";
import Wide from "./optionsUIs/Wide.ts";
import Square from "./optionsUIs/Square.ts";
import MenuBack from "./optionsUIs/Menu.ts";
import ScreenMode from "./optionsUIs/ScreenMode.ts";
import Windowed from "./optionsUIs/Windowed.ts";
import FullScreenMenu from "./optionsUIs/FullScreen.ts";
import ControlsName from "./controlsUIs/ControlsName.ts";
import Computer from "./controlsUIs/Computer.ts";
import ComputerControls from "./controlsUIs/ComputerControls.ts";
import Mobile from "./controlsUIs/Mobile.ts";
import MobileControls from "./controlsUIs/MobileControls.ts";
import ProTip from "./menuUIs/ProTip.ts";
import DownloadApp from "./menuUIs/DownloadApp.ts";

class UI {
  public static readonly MenuUIs = [
    Name,
    Start,
    Exit,
    Controls,
    CopyRight,
    Options,
    ProTip,
    DownloadApp,
  ];
  public static readonly OptionsUIs = [
    OptionsName,
    Name,
    CopyRight,
    ScreenAspect,
    ScreenMode,
    UltraWide,
    Wide,
    Square,
    MenuBack,
    FullScreenMenu,
    Windowed,
    ProTip,
    DownloadApp,
  ];
  public static readonly ControlsUIs = [
    Name,
    CopyRight,
    MenuBack,
    ControlsName,
    Computer,
    ComputerControls,
    Mobile,
    MobileControls,
    ProTip,
    DownloadApp,
  ];
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
    RestartPs,
    FullScreen,
    Menu,
  ];
  public static readonly OverUIs = [
    GameOver,
    Reason,
    Restart,
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

  public getAllOptionsUIs(): OptionsUIInstance[] {
    return UI.OptionsUIs.map(
      (OptionsUI) =>
        new OptionsUI({
          gameWidth: this.gameWidth,
          gameHeight: this.gameHeight,
        })
    );
  }

  public getAllControlsUIs(): ControlsUIInstance[] {
    return UI.ControlsUIs.map(
      (ControlsUI) =>
        new ControlsUI({
          gameWidth: this.gameWidth,
          gameHeight: this.gameHeight,
        })
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
