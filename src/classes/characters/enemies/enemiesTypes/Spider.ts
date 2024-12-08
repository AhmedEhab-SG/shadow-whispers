import ClimbingEnemy from "../ClimbingEnemy";
import SpiderObj from "../../../../constants/characters/enemies/Spider";

class Spider extends ClimbingEnemy {
  public static readonly uniqueName = SpiderObj.name;
  public static readonly type = SpiderObj.type;
  public readonly uniqueName = Spider.uniqueName;
  public readonly type = Spider.type;

  protected enviGroundMargin: number;

  public constructor(
    protected gameWidth: number,
    protected gameHeight: number,
    {
      enviGroundMargin,
    }: {
      enviGroundMargin: number;
    }
  ) {
    super(SpiderObj.enemyObj, gameWidth, gameHeight, enviGroundMargin);
    this.enviGroundMargin = enviGroundMargin;
    this.init();
  }

  private init() {
    this.sizeScale = 0.25;

    this.x = this.gameWidth;
    this.y = Math.random() * this.gameHeight * 0.5;

    this.vy = Math.random() > 0.5 ? 1 : -1;
  }
}

export default Spider;
