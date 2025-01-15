import FlyingEnemy from "../FlyingEnemy";
import RavenObj from "../../../../constants/characters/enemies/Raven";

class Raven extends FlyingEnemy {
  public static readonly uniqueName = RavenObj.name;
  public static readonly type = RavenObj.type;
  public readonly uniqueName = Raven.uniqueName;
  public readonly type = Raven.type;

  public constructor(
    protected gameWidth: number,
    protected gameHeight: number,
    {
      enviSkyMargin,
      enviGroundMargin,
    }: { enviSkyMargin: number; enviGroundMargin: number }
  ) {
    super(
      RavenObj.enemyObj,
      gameWidth,
      gameHeight,
      enviGroundMargin,
      enviSkyMargin
    );
    this.init();
  }

  private init() {
    this.sizeScale = 0.35;

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

export default Raven;
