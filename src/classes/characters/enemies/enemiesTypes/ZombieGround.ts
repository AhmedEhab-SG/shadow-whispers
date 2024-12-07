import GroundEnemy from "../GroundEnemy";
import ZombieGroundObj from "../../../../constants/characters/enemies/ZombieGround";

class ZombieGround extends GroundEnemy {
  public static readonly uniqueName = ZombieGroundObj.name;
  public static readonly type = ZombieGroundObj.type;
  public readonly uniqueName = ZombieGround.uniqueName;
  public readonly type = ZombieGround.type;

  protected enviGroundMargin: number;

  constructor(
    protected gameWidth: number,
    protected gameHeight: number,
    { enviGroundMargin }: { enviGroundMargin: number }
  ) {
    super(ZombieGroundObj.enemyObj, gameWidth, gameHeight, 80);
    this.enviGroundMargin = enviGroundMargin;

    this.init();
  }

  init() {
    this.sizeScale = 0.90;

    this.vx = Math.random() * 0.8 + 0.3;

    this.vFrameX = (this.vx + 5) * this.sizeScale;

    super.init();
  }

  update({
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

export default ZombieGround;
