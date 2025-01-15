import FlyingEnemy from "../FlyingEnemy";
import GhostGloomyObj from "../../../../constants/characters/enemies/GhostGloomy";

class GhostGloomy extends FlyingEnemy {
  public static readonly uniqueName = GhostGloomyObj.name;
  public static readonly type = GhostGloomyObj.type;
  public readonly uniqueName = GhostGloomy.uniqueName;
  public readonly type = GhostGloomy.type;

  public constructor(
    protected gameWidth: number,
    protected gameHeight: number,
    {
      enviSkyMargin,
      enviGroundMargin,
    }: { enviSkyMargin: number; enviGroundMargin: number }
  ) {
    super(
      GhostGloomyObj.enemyObj,
      gameWidth,
      gameHeight,
      enviGroundMargin,
      enviSkyMargin
    );
    this.init();
  }

  private init() {
    this.sizeScale = 0.85;

    this.angleCurve = Math.random() * 1.5 + 0.5;

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

export default GhostGloomy;
