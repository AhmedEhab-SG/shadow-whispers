import FlyingEnemy from "../FlyingEnemy";
import BatCrazyObj from "../../../../constants/characters/enemies/BatCrazy";

class BatCrazy extends FlyingEnemy {
  public static readonly uniqueName = BatCrazyObj.name;
  public static readonly type = BatCrazyObj.type;
  public readonly uniqueName = BatCrazy.uniqueName;
  public readonly type = BatCrazy.type;

  constructor(protected gameWidth: number, protected gameHeight: number) {
    super(BatCrazyObj.enemyObj, gameWidth, gameHeight);
    this.init();
  }

  init() {
    this.sizeScale = 0.28; // scale size of the bird

    this.vFrameX = (this.vy + 5) * this.sizeScale;
  }

  update({
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

export default BatCrazy;
