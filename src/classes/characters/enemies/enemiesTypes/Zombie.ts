import GroundEnemy from "../GroundEnemy";
import ZombieObj from "../../../../constants/characters/enemies/Zombie";

class Zombie extends GroundEnemy {
  public static readonly uniqueName = ZombieObj.name;
  public static readonly type = ZombieObj.type;
  public readonly uniqueName = Zombie.uniqueName;
  public readonly type = Zombie.type;

  protected enviGroundMargin: number;

  constructor(
    protected gameWidth: number,
    protected gameHeight: number,
    { enviGroundMargin }: { enviGroundMargin: number }
  ) {
    super(ZombieObj.enemyObj, gameWidth, gameHeight, 80);
    this.enviGroundMargin = enviGroundMargin;

    this.init();
  }

  init() {
    this.sizeScale = 0.35; // scale size of the bird

    this.vx = Math.random() * 0.8 + 0.3; // velocity x-axis speed

    this.vFrameX = (this.vx + 5) * this.sizeScale;

    // velocity of the frame
    super.init();
  }

  update({
    deltaTime,
    gameSpeed,
    heroCords,
  }: {
    deltaTime: number;
    gameSpeed: number;
    heroCords: { x: number; y: number };
  }): void {
    super.update({ deltaTime, gameSpeed });

    this.x += heroCords.x > this.x ? this.vx * 2 : -this.vx;

    this.reverseImg = heroCords.x > this.x;
  }
}

export default Zombie;
