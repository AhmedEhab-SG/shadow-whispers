import FlyingEnemy from "../FlyingEnemy";
import BatObj from "../../../../constants/characters/enemies/Bat";

class Bat extends FlyingEnemy {
  public static readonly uniqueName = BatObj.name;
  public static readonly type = BatObj.type;
  public readonly uniqueName = Bat.uniqueName;
  public readonly type = Bat.type;

  constructor(protected gameWidth: number, protected gameHeight: number) {
    super(BatObj.enemyObj, gameWidth, gameHeight);
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

export default Bat;
