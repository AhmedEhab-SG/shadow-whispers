import FlyingEnemy from "../FlyingEnemy";
import FlyObj from "../../../../constants/characters/enemies/Fly";

class Fly extends FlyingEnemy {
  public static readonly uniqueName = FlyObj.name;
  public static readonly type = FlyObj.type;
  public readonly uniqueName = Fly.uniqueName;
  public readonly type = Fly.type;

  public constructor(
    protected gameWidth: number,
    protected gameHeight: number,
    {
      enviSkyMargin,
      enviGroundMargin,
    }: { enviSkyMargin: number; enviGroundMargin: number }
  ) {
    super(
      FlyObj.enemyObj,
      gameWidth,
      gameHeight,
      enviGroundMargin,
      enviSkyMargin
    );
    this.init();
  }

  private init() {
    this.sizeScale = 0.8;

    this.va = Math.random() * 0.08 + 0.03;

    this.angleCurve = Math.random() * 1.5 + 0.5;

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

export default Fly;
