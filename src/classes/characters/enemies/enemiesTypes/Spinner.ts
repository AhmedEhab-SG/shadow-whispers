import FlyingEnemy from "../FlyingEnemy";
import SpinnerObj from "../../../../constants/characters/enemies/Spinner";

class Spinner extends FlyingEnemy {
  public static readonly uniqueName = SpinnerObj.name;
  public static readonly type = SpinnerObj.type;
  public readonly uniqueName = Spinner.uniqueName;
  public readonly type = Spinner.type;

  constructor(protected gameWidth: number, protected gameHeight: number) {
    super(SpinnerObj.enemyObj, gameWidth, gameHeight);
    this.init();
  }

  init() {
    this.sizeScale = 0.35;

    this.va = Math.random() * 0.08 + 0.03;

    this.angleCurve = Math.random() * 1.5 + 0.5;

    this.vy = Math.random() * 0.08 + 0.03;

    this.vFrameX = (this.vy + this.angleCurve) * this.sizeScale;
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

export default Spinner;
