import FlyingEnemy from "../FlyingEnemy";
import BatObj from "../../../../constants/characters/enemies/Bat";

class Bat extends FlyingEnemy {
  public static readonly uniqueName = BatObj.name;
  public static readonly type = BatObj.type;
  public readonly uniqueName = Bat.uniqueName;
  public readonly type = Bat.type;

  public constructor(
    protected gameWidth: number,
    protected gameHeight: number,
    {
      enviSkyMargin,
      enviGroundMargin,
    }: { enviSkyMargin: number; enviGroundMargin: number }
  ) {
    super(
      BatObj.enemyObj,
      gameWidth,
      gameHeight,
      enviGroundMargin,
      enviSkyMargin
    );
    this.init();
  }

  private init() {
    this.sizeScale = 0.28;

    this.vFrameX = (this.vy + 5) * this.sizeScale;
  }

  public update({
    deltaTime,
    gameSpeed,
  }: {
    deltaTime: number;
    gameSpeed: number;
  }): void {
    super.update({ deltaTime, gameSpeed });

    this.y += this.vy + Math.random() * 3 - 1.5;
  }
}

export default Bat;
