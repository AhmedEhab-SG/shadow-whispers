import UI from "../../classes/ui";
import FireFly from "../../classes/vfx/particles/FIreFly";
import Particle from "../../classes/vfx/particles/Particle";
import GameStatus from "../../config/GameStatus";
import BaseKeys from "../../enum/BaseKeys";
import IDrawable from "../../interfaces/IDrawable";
import { ControlActions } from "../../types/events";
import { GameStates } from "../../types/game";
import { MenuUIInstance } from "../../types/ui";
import Interval from "../../utils/Interval";

class Menu extends Interval implements IDrawable {
  private canvasSpeed: number = 0;
  private particles: Particle[] = [];
  private ui: MenuUIInstance[] = [];

  public constructor(
    private width: number,
    private height: number,
    public gameStates: GameStates
  ) {
    super();

    this.init();
  }

  private init() {
    // create particles
    this.createParticles();

    // create UI

    this.ui = new UI({
      gameWidth: this.width,
      gameHeight: this.height,
    }).getAllMenuUIs();
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
    if (this.gameStates.status !== GameStatus.MENU) return;

    // update the particles
    this.particles.forEach((particle) =>
      particle.update({ gameSpeed: this.canvasSpeed })
    );
    this.particles = this.particles.filter((particle) => !particle.markDelete);

    // update the UI
    this.ui.forEach((ui) => {
      ui.update({ controlActions, gameStates: this.gameStates });
    });
  }

  public draw(_ctx: CanvasRenderingContext2D): void {
    if (this.gameStates.status !== GameStatus.MENU) return;

    // draw the particles
    this.particles.forEach((particle) => particle.draw(_ctx));

    // draw the UI
    this.ui.forEach((ui) => ui.draw(_ctx));
  }
}

export default Menu;
