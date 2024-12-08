import GroundEnemy from "../GroundEnemy";
import HandObj from "../../../../constants/characters/enemies/Hand";

class Hand extends GroundEnemy {
  public static readonly uniqueName = HandObj.name;
  public static readonly type = HandObj.type;
  public readonly uniqueName = Hand.uniqueName;
  public readonly type = Hand.type;

  protected enviGroundMargin: number;

  public constructor(
    protected gameWidth: number,
    protected gameHeight: number,
    { enviGroundMargin }: { enviGroundMargin: number }
  ) {
    super(HandObj.enemyObj, gameWidth, gameHeight, 80);
    this.enviGroundMargin = enviGroundMargin;

    this.init();
  }

  protected init() {
    this.sizeScale = 0.95; // scale size of the bird

    this.vx = Math.random() * 0.8 + 0.3; // velocity x-axis speed

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

export default Hand;
