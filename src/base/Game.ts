import DefaultControls from "../config/DefaultControls";
import GameStatus from "../config/GameStatus";
import BaseResolution from "../constants/BaseResolution";
import AspectRatio from "../enum/AspectRatio";
import ControlKeys from "../events/ControlKeys";
import Resize from "../events/Resize";
import ScreenViewport from "../handlers/ScreenViewport";
import IGame from "../interfaces/IGame";
import Canvas from "../utils/Canvas";
import GameUtils from "../utils/GameUtils";
import Menu from "./status/Menu";
import InGame from "./status/InGame";
import { GameStates } from "../types/game";
import ControlInput from "../events/ControlInput";

class Game extends GameUtils implements IGame {
  private width = 0;
  private height = 0;

  private gameStates: GameStates = {
    debugMode: false,
    status: GameStatus.MENU,
  };

  // Canvas
  private canvas: Canvas = new Canvas(BaseResolution);

  // Viewport
  private screenViewport: ScreenViewport = new ScreenViewport(
    AspectRatio.WIDE_SCREEN
  );

  // Events
  private controlKeys: ControlKeys = new ControlKeys(
    DefaultControls,
    this.gameStates.debugMode
  );
  private controlInput: ControlInput = new ControlInput(this.canvas.tag);

  private menu?: Menu;
  private inGame?: InGame;

  public constructor() {
    super();
    this.init();
  }

  private init(): void {
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.canvas.setBaseStyles(
      this.screenViewport.calcWidth(),
      this.screenViewport.calcHeight()
    );
    this.canvas.create();

    this.afterInit();
  }

  private afterInit(): void {
    this.events();

    // game status init
    this.menu = new Menu(this.width, this.height, this.gameStates);
    this.inGame = new InGame(this.width, this.height, this.gameStates);
  }

  private events(): void {
    new Resize(this.screenViewport, this.canvas.tag).addHandler();
    this.controlKeys.addHandlers();
    this.controlInput.addHandlers();
  }

  protected update({ deltaTime }: { deltaTime: number }): void {
    // start menu update

    this.menu?.update({
      deltaTime,
      keys: this.controlKeys.keys,
      controlActions: this.controlInput.controlActions,
    });

    // in game update
    this.inGame?.update({
      deltaTime,
      keys: this.controlKeys.keys,
      controlActions: this.controlInput.controlActions,
    });
  }

  protected draw(): void {
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
