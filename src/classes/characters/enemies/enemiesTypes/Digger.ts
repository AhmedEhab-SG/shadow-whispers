import GroundEnemy from "../GroundEnemy";
import DiggerObj from "../../../../constants/characters/enemies/Digger";

class Digger extends GroundEnemy {
  public static readonly uniqueName = DiggerObj.name;
  public static readonly type = DiggerObj.type;
  public readonly uniqueName = Digger.uniqueName;
  public readonly type = Digger.type;

  protected enviGroundMargin: number;

  public constructor(
    protected gameWidth: number,
    protected gameHeight: number,
    { enviGroundMargin }: { enviGroundMargin: number }
  ) {
    super(DiggerObj.enemyObj, gameWidth, gameHeight, 80);
    this.enviGroundMargin = enviGroundMargin;

    this.init();
  }

  protected init() {
    this.sizeScale = 0.35;

    this.vx = Math.random() * 0.8 + 0.3;

    this.vFrameX = (this.vx + 5) * this.sizeScale;

    super.init();
  }

  public update({
    deltaTime,
    gameSpeed,
  }: {
    deltaTime: number;
    gameSpeed: number;
  }): void {
    super.update({ deltaTime, gameSpeed });

    this.x += this.vx;
  }
}

export default Digger;
