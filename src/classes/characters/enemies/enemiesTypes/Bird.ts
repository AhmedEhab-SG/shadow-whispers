import FlyingEnemy from "../FlyingEnemy";
import BirdObj from "../../../../constants/characters/enemies/Bird";

class Bird extends FlyingEnemy {
  public static readonly uniqueName = BirdObj.name;
  public static readonly type = BirdObj.type;
  public readonly uniqueName = Bird.uniqueName;
  public readonly type = Bird.type;

  public constructor(
    protected gameWidth: number,
    protected gameHeight: number,
    {
      enviSkyMargin,
      enviGroundMargin,
    }: { enviSkyMargin: number; enviGroundMargin: number }
  ) {
    super(
      BirdObj.enemyObj,
      gameWidth,
      gameHeight,
      enviGroundMargin,
      enviSkyMargin
    );
    this.init();
  }

  private init() {
    this.sizeScale = 0.3;

    this.va = Math.random() * 0.08 + 0.03;

    this.angleCurve = Math.random() * 1.5 + 0.5;

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

export default Bird;
