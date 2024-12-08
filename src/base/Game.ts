import DefaultControls from "../config/DefaultControls";
import GameStatus from "../config/GameStatus";
import BaseResolution from "../constants/BaseResolution";
import AspectRatio from "../enum/AspectRatio";
import ControlKeys from "../events/ControlKeys";
import ControlMouse from "../events/ControlMouse";
import Resize from "../events/Resize";
import ScreenViewport from "../handlers/ScreenViewport";
import IGame from "../interfaces/IGame";
import Canvas from "../utils/Canvas";
import GameUtils from "../utils/GameUtils";
import Menu from "./Menu";
import InGame from "./InGame";

class Game extends GameUtils implements IGame {
  private width = 0;
  private height = 0;
  private gameStatus: GameStatus = GameStatus.PLAYING;
  private debugMode = false;

  // Canvas
  private canvas: Canvas = new Canvas(BaseResolution);

  // Viewport
  private screenViewport: ScreenViewport = new ScreenViewport(
    AspectRatio.WIDE_SCREEN
  );

  // Events
  private controlKeys: ControlKeys = new ControlKeys(
    DefaultControls,
    this.debugMode
  );
  private controlMouse: ControlMouse = new ControlMouse(this.canvas.tag);

  private menu?: Menu;
  private inGame?: InGame;

  public constructor() {
    super();
    this.init();
  }

  private init(): void {
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.setStylesResolutionToCanvas(
      this.canvas.tag,
      this.screenViewport.calculateWidth(),
      this.screenViewport.calculateHeight()
    );
    this.canvas.create();

    this.afterInit();
  }

  private afterInit(): void {
    this.events();

    // game features init
    this.menu = new Menu(this.width, this.height, this.gameStatus);
    this.inGame = new InGame(this.width, this.height, this.gameStatus);
  }

  private events(): void {
    new Resize(this.screenViewport, this.canvas.tag).addHandler();
    this.controlKeys.addHandlers();
    this.controlMouse.addHandlers();
  }

  public update({ deltaTime }: { deltaTime: number }): void {
    // start menu update
    this.menu?.update({
      deltaTime,
      keys: this.controlKeys.keys,
      cords: this.controlMouse.cords,
    });

    // in game update
    this.inGame?.update({
      deltaTime,
      keys: this.controlKeys.keys,
      cords: this.controlMouse.cords,
    });
    this.gameStatus = this.inGame?.gameStatus ?? this.gameStatus;
  }

  public draw(): void {
    // Clear the canvas
    this.canvas.clear();

    // start menu draw
    this.menu?.draw(this.canvas.ctx);

    // in game draw
    this.inGame?.draw(this.canvas.ctx, this.controlKeys.debugMode);
  }

  public start(): void {
    this.runInterval((deltaTime) => {
      this.update({ deltaTime });
      this.draw();
    });
  }
}

export default Game;
