import { EnemyObj } from "../../../types/enemy";
import Enemy from "./Enemy";

abstract class GroundEnemy extends Enemy {
  constructor(
    protected enemyObj: EnemyObj,
    protected gameWidth: number,
    protected gameHeight: number,
    protected enviGroundMargin: number
  ) {
    super(enemyObj);

    this.x = this.gameWidth;

    this.vy = 0;

    this.init();
  }

  protected init() {
    this.y = this.gameHeight - this.enviGroundMargin - this.height;
  }
}

export default GroundEnemy;
