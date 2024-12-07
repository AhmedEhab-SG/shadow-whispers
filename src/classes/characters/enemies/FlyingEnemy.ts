import { EnemyObj } from "../../../types/enemy";
import Enemy from "./Enemy";

abstract class FlyingEnemy extends Enemy {
  private _angle = 0;
  private _angleCurve = 0;
  private _va = 0; // angle velocity

  constructor(
    protected enemyObj: EnemyObj,
    protected gameWidth: number,
    protected gameHeight: number
  ) {
    super(enemyObj);

    this.x = this.gameWidth + Math.random() * this.gameWidth * 0.5;

    this.y = Math.random() * this.gameHeight * 0.5;

    this.vx = Math.random() + 1;
    this.vy = 0;
  }

  // Getter and Setter
  protected get angle(): number {
    return this._angle;
  }

  protected set angle(value: number) {
    this._angle = value;
  }

  protected get va(): number {
    return this._va;
  }

  protected set va(value: number) {
    this._va = value;
  }

  protected get angleCurve(): number {
    return this._angleCurve;
  }

  protected set angleCurve(value: number) {
    this._angleCurve = value;
  }
}

export default FlyingEnemy;
