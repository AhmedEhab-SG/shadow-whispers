import DefaultControls from "../config/DefaultControls";
import GameStatus from "../config/GameStatus";
import BaseResolution from "../constants/BaseResolution";
import AspectRatio from "../enum/AspectRatio";
import ControlKeys from "../events/ControlKeys";
import Resize from "../events/Resize";
import FitViewport from "../handlers/FitViewport";
import IGame from "../interfaces/IGame";
import Canvas from "../utils/Canvas";
import GameUtils from "../utils/GameUtils";
import Menu from "./status/Menu";
import Playing from "./status/Playing";
import { GameStates } from "../types/game";
import ControlInput from "../events/ControlInput";
import Pause from "./status/Pause";
import Over from "./status/Over";
import Next from "./status/Next";
import Orientation from "../events/Orientation";
import Prompt from "../events/Prompt";

class Game extends GameUtils implements IGame {
  private width = 0;
  private height = 0;

  // Canvas
  private canvas: Canvas = new Canvas(BaseResolution);

  // Viewport
  private fitViewport: FitViewport = new FitViewport(AspectRatio.WIDE_SCREEN);

  // Events
  private controlInput: ControlInput = new ControlInput(this.canvas.tag);
  private resize = new Resize(this.fitViewport, this.canvas.tag);
  private orientation = new Orientation();
  private prompt = new Prompt();

  // Game States
  private gameStates: GameStates = {
    debugMode: false,
    status: GameStatus.MENU,
    aspectRatio: this.fitViewport.aspectRatio,
    showInstallPrompt: () => this.prompt.showInstallPrompt(),
  };
  private controlKeys: ControlKeys = new ControlKeys(
    DefaultControls,
    this.gameStates.debugMode
  );

  private menu?: Menu;
  private playing?: Playing;
  private pause?: Pause;
  private over?: Over;
  private next?: Next;

  public constructor() {
    super();
    this.init();
    this.afterInit();
  }

  private init(): void {
    this.width = this.canvas.width;
    this.height = this.canvas.height;

    this.canvas.setBaseStyles(
      this.fitViewport.calcWidth(),
      this.fitViewport.calcHeight()
    );

    this.canvas.create();
  }

  private afterInit(): void {
    this.removeEvents();
    this.addEvents();

    // game status init
    this.menu = new Menu(this.width, this.height, this.gameStates);
    this.playing = new Playing(this.width, this.height, this.gameStates);
    this.pause = new Pause(this.width, this.height, this.gameStates);
    this.over = new Over(this.width, this.height, this.gameStates);
    this.next = new Next(this.width, this.height, this.gameStates);
  }

  private addEvents(): void {
    this.resize.addHandler();
    this.controlKeys.addHandlers();
    this.controlInput.addHandlers();
    this.orientation.addHandler();
    this.prompt.addHandler();
  }

  private removeEvents(): void {
    this.resize.removeHandler();
    this.controlKeys.removeHandlers();
    this.controlInput.removeHandlers();
    this.orientation.removeHandler();
    this.prompt.removeHandler();
  }

  private updateAspectRatio(): void {
    if (this.gameStates.aspectRatio !== this.fitViewport.aspectRatio) {
      this.fitViewport.aspectRatio = this.gameStates.aspectRatio;
      this.fitViewport.update(innerWidth, innerHeight);
      this.init();
    }
  }

  protected update({ deltaTime }: { deltaTime: number }): void {
    // update aspect ratio
    this.updateAspectRatio();

    // start menu update
    this.menu?.update({
      deltaTime,
      keys: this.controlKeys.keys,
      controlActions: this.controlInput.controlActions,
    });

    // in game update
    this.playing?.update({
      deltaTime,
      keys: this.controlKeys.keys,
      controlActions: this.controlInput.controlActions,
    });

    // pause update
    this.pause?.update({
      controlActions: this.controlInput.controlActions,
    });

    // over update
    this.over?.update({
      controlActions: this.controlInput.controlActions,
    });

    // next update
    this.next?.update({
      controlActions: this.controlInput.controlActions,
    });
  }

  protected draw(): void {
    // Clear the canvas
    this.canvas.clear();

    // start menu draw
    this.menu?.draw(this.canvas.ctx);

    // in game draw
    this.playing?.draw(this.canvas.ctx, this.controlKeys.debugMode);

    // pause draw
    this.pause?.draw(this.canvas.ctx);

    // over draw
    this.over?.draw(this.canvas.ctx);

    // next draw
    this.next?.draw(this.canvas.ctx);
  }

  public start(): void {
    this.runInterval((deltaTime) => {
      this.update({ deltaTime });
      this.draw();
    });
  }
}

export default Game;
