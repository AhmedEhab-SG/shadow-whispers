import GroundEnemy from "../GroundEnemy";
import PlantObj from "../../../../constants/characters/enemies/Plant";

class Plant extends GroundEnemy {
  public static readonly uniqueName = PlantObj.name;
  public static readonly type = PlantObj.type;
  public readonly uniqueName = Plant.uniqueName;
  public readonly type = Plant.type;

  protected enviGroundMargin: number;

  public constructor(
    protected gameWidth: number,
    protected gameHeight: number,
    { enviGroundMargin }: { enviGroundMargin: number }
  ) {
    super(PlantObj.enemyObj, gameWidth, gameHeight, 80);
    this.enviGroundMargin = enviGroundMargin;

    this.init();
  }

  protected init() {
    this.sizeScale = 1.2; // scale size of the bird

    this.vx = Math.random() * 0.8 + 0.3; // velocity x-axis speed

    this.vFrameX = this.vx * this.sizeScale;

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

export default Plant;
