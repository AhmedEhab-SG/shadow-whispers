import FlyingEnemy from "../FlyingEnemy";
import GhostFastObj from "../../../../constants/characters/enemies/GhostFast";

class GhostFast extends FlyingEnemy {
  public static readonly uniqueName = GhostFastObj.name;
  public static readonly type = GhostFastObj.type;
  public readonly uniqueName = GhostFast.uniqueName;
  public readonly type = GhostFast.type;

  public constructor(
    protected gameWidth: number,
    protected gameHeight: number
  ) {
    super(GhostFastObj.enemyObj, gameWidth, gameHeight);
    this.init();
  }

  private init() {
    this.sizeScale = 0.85;

    this.va = Math.random() * 0.08 + 0.03;

    this.vFrameX = (this.vy + this.angleCurve + 10) * this.sizeScale;
  }

  public update({
    deltaTime,
    gameSpeed,
  }: {
    deltaTime: number;
    gameSpeed: number;
  }): void {
    super.update({ deltaTime, gameSpeed });

    this.angle += this.va;

    this.y += this.vy + this.angleCurve * Math.sin(this.angle);
  }
}

export default GhostFast;
