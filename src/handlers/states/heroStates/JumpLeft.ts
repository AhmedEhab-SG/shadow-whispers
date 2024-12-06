import State from "../State";
import Hero from "../../../classes/characters/heroes/Hero";
import { HeroObj } from "../../../types/hero";
import HeroStates from "../../../enum/HeroStates";
import BaseKeys from "../../../enum/BaseKeys";

class JumpLeft extends State {
  public static readonly stateName = HeroStates.JUMP_LEFT;
  public readonly stateName = JumpLeft.stateName;

  private gameHeight: number;
  private enviGroundMargin: number;
  private enviGravity: number;

  constructor(
    protected hero: Hero,
    protected heroObj: HeroObj,
    {
      gameHeight,
      enviGroundMargin,
      enviGravity,
    }: {
      gameHeight: number;
      enviGroundMargin: number;
      enviGravity: number;
    }
  ) {
    super(hero, heroObj, JumpLeft.stateName);
    this.gameHeight = gameHeight;
    this.enviGroundMargin = enviGroundMargin;
    this.enviGravity = enviGravity;
  }

  public enter() {
    // // to make the player jump with the same height on any screen size
    if (this.hero.isOnGround())
      this.hero.vy = -this.calcJumpHeight(
        this.gameHeight,
        this.enviGroundMargin,
        this.hero.height,
        this.heroObj.weight,
        this.enviGravity
      );

    super.enter();
  }

  public keysHandler(keys: BaseKeys[]) {
    if (!this.hero.lives) return this.hero.setState(HeroStates.DEAD, 0);

    // to make the player change direction while in the air
    if (this.hero.vy < this.heroObj.weight && keys.includes(BaseKeys.RIGHT))
      return this.hero.setState(HeroStates.JUMP_RIGHT, 2);

    // to make the player fall after reaching the peak
    if (this.hero.vy > this.heroObj.weight && keys.includes(BaseKeys.RIGHT))
      return this.hero.setState(HeroStates.FALL_RIGHT, 1);

    if (this.hero.vy > this.heroObj.weight)
      return this.hero.setState(HeroStates.FALL_LEFT, 0);

    // check reached the peak and will fall
    if (
      keys.includes(BaseKeys.ACTION) &&
      this.hero.energy &&
      keys.includes(BaseKeys.RIGHT)
    )
      return this.hero.setState(HeroStates.ROLL_RIGHT, 2);

    // to make it jump in place and roll
    if (keys.includes(BaseKeys.ACTION) && this.hero.energy)
      return this.hero.setState(HeroStates.ROLL_LEFT, 0);

    // to make the player dive while in the air
    if (keys.includes(BaseKeys.DOWN) && !this.hero.isOnGround())
      return this.hero.setState(HeroStates.DIVE, 0);
  }
}

export default JumpLeft;
