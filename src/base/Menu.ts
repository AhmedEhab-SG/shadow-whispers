import GameStatus from "../config/GameStatus";
import BaseKeys from "../enum/BaseKeys";
import IDrawable from "../interfaces/IDrawable";
import Interval from "../utils/Interval";

class Menu extends Interval implements IDrawable {
  constructor(
    private width: number,
    private height: number,
    private gameStatus: GameStatus
  ) {
    super();
    this.init();
  }

  private init() {}

  update({
    deltaTime,
    keys,
    cords,
  }: {
    deltaTime: number;
    keys: BaseKeys[];
    cords: { x: number; y: number };
  }): void {
    if (this.gameStatus !== GameStatus.MENU) return;

    if (deltaTime) return;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.gameStatus !== GameStatus.MENU) return;
  }
}

export default Menu;
