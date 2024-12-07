import FlyingEnemy from "../FlyingEnemy";
import GhostObj from "../../../../constants/characters/enemies/Ghost";

class Ghost extends FlyingEnemy {
  public static readonly uniqueName = GhostObj.name;
  public static readonly type = GhostObj.type;
  public readonly uniqueName = Ghost.uniqueName;
  public readonly type = Ghost.type;

  constructor(protected gameWidth: number, protected gameHeight: number) {
    super(GhostObj.enemyObj, gameWidth, gameHeight);
    this.init();
  }

  init() {
    this.sizeScale = 0.3;

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

export default Ghost;
