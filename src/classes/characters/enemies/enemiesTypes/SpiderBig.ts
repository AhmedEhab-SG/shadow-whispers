import ClimbingEnemy from "../ClimbingEnemy";
import SpiderBigObj from "../../../../constants/characters/enemies/SpiderBig";

class SpiderBig extends ClimbingEnemy {
  public static readonly uniqueName = SpiderBigObj.name;
  public static readonly type = SpiderBigObj.type;
  public readonly uniqueName = SpiderBig.uniqueName;
  public readonly type = SpiderBig.type;

  protected enviGroundMargin: number;
  protected heroCord: { x: number; y: number };

  public constructor(
    protected gameWidth: number,
    protected gameHeight: number,
    {
      enviGroundMargin,
      heroCord,
    }: { enviGroundMargin: number; heroCord: { x: number; y: number } }
  ) {
    super(SpiderBigObj.enemyObj, gameWidth, gameHeight, enviGroundMargin);
    this.enviGroundMargin = enviGroundMargin;
    this.heroCord = heroCord;
    this.init();
  }

  private init() {
    this.sizeScale = 0.75;

    this.x =
      Math.random() * 0.5
        ? Math.random() * this.gameWidth - this.width
        : this.heroCord.x;

    this.vx = Math.random() * 0.8 + 0.3; // velocity x-axis speed

    this.y = 0;
  }

  public update({
    deltaTime,
    gameSpeed,
    heroCords,
  }: {
    deltaTime: number;
    gameSpeed: number;
    heroCords: { x: number; y: number };
  }): void {
    super.update({ deltaTime, gameSpeed });

    this.x += heroCords?.x > this.x ? this.vx * 2 : -this.vx;
  }
}

export default SpiderBig;
