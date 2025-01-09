import UI from "../../classes/ui";
import FireFly from "../../classes/vfx/particles/FIreFly";
import Particle from "../../classes/vfx/particles/Particle";
import GameStatus from "../../config/GameStatus";
import BaseKeys from "../../enum/BaseKeys";
import Save from "../../handlers/Save";
import IDrawable from "../../interfaces/IDrawable";
import { ControlActions } from "../../types/events";
import { GameStates } from "../../types/game";
import {
  ControlsUIInstance,
  MenuUIInstance,
  OptionsUIInstance,
} from "../../types/ui";
import Interval from "../../utils/Interval";

class Menu extends Interval implements IDrawable {
  private canvasSpeed: number = 0;
  private particles: Particle[] = [];
  private menUi: MenuUIInstance[] = [];
  private optionsUi: OptionsUIInstance[] = [];
  private controlsUi: ControlsUIInstance[] = [];
  private save: Save | null = null;

  private activeStates = [
    GameStatus.MENU,
    GameStatus.OPTIONS,
    GameStatus.CONTROLS,
  ];

  public constructor(
    private width: number,
    private height: number,
    private gameStates: GameStates
  ) {
    super();

    this.init();
  }

  private init() {
    // create particles
    this.save = new Save();
    this.createParticles();

    // create UI

    this.menUi = new UI({
      gameWidth: this.width,
      gameHeight: this.height,
    }).getAllMenuUIs(this.save.loadGame());

    this.optionsUi = new UI({
      gameWidth: this.width,
      gameHeight: this.height,
    }).getAllOptionsUIs();

    this.controlsUi = new UI({
      gameWidth: this.width,
      gameHeight: this.height,
    }).getAllControlsUIs();
  }

  private createParticles() {
    for (let i = 0; i < 100; i++) {
      this.particles.push(new FireFly(this.width, this.height));
    }
  }

  public update({
    controlActions,
  }: {
    deltaTime: number;
    keys: BaseKeys[];
    controlActions: ControlActions;
  }): void {
    if (!this.isKeepActive()) return;

    // update the particles
    this.particles.forEach((particle) =>
      particle.update({ gameSpeed: this.canvasSpeed })
    );
    this.particles = this.particles.filter((particle) => !particle.markDelete);

    // update the UI
    if (this.gameStates.status === GameStatus.MENU)
      this.menUi.forEach((ui) => {
        ui.update({
          controlActions,
          gameStates: this.gameStates,
        });
      });

    if (this.gameStates.status === GameStatus.OPTIONS)
      this.optionsUi.forEach((ui) => {
        ui.update({
          controlActions,
          gameStates: this.gameStates,
        });
      });

    if (this.gameStates.status === GameStatus.CONTROLS)
      this.controlsUi.forEach((ui) => {
        ui.update({
          controlActions,
          gameStates: this.gameStates,
        });
      });
  }

  public draw(_ctx: CanvasRenderingContext2D): void {
    if (!this.isKeepActive()) return;

    // draw the particles
    this.particles.forEach((particle) => particle.draw(_ctx));

    // draw the UI
    if (this.gameStates.status === GameStatus.MENU)
      this.menUi.forEach((ui) => ui.draw(_ctx));

    if (this.gameStates.status === GameStatus.OPTIONS)
      this.optionsUi.forEach((ui) => ui.draw(_ctx));

    if (this.gameStates.status === GameStatus.CONTROLS)
      this.controlsUi.forEach((ui) => ui.draw(_ctx));
  }

  private isKeepActive() {
    return this.activeStates.some(
      (status) => status === this.gameStates.status
    );
  }
}

export default Menu;
