import FlyingEnemy from "../FlyingEnemy";
import GhostEyeObj from "../../../../constants/characters/enemies/GhostEye";

class GhostEye extends FlyingEnemy {
  public static readonly uniqueName = GhostEyeObj.name;
  public static readonly type = GhostEyeObj.type;
  public readonly uniqueName = GhostEye.uniqueName;
  public readonly type = GhostEye.type;

  public constructor(
    protected gameWidth: number,
    protected gameHeight: number,
    {
      enviSkyMargin,
      enviGroundMargin,
    }: { enviSkyMargin: number; enviGroundMargin: number }
  ) {
    super(
      GhostEyeObj.enemyObj,
      gameWidth,
      gameHeight,
      enviGroundMargin,
      enviSkyMargin
    );
    this.init();
  }

  private init() {
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

export default GhostEye;
