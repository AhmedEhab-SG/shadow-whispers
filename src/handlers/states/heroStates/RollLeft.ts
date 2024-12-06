import State from "../State";
import Hero from "../../../classes/characters/heroes/Hero";
import { HeroObj } from "../../../types/hero";
import HeroStates from "../../../enum/HeroStates";
import BaseKeys from "../../../enum/BaseKeys";
import Fire from "../../../classes/vfx/particles/Fire";

class RollLeft extends State {
  public static readonly stateName = HeroStates.ROLL_LEFT;
  public readonly stateName = RollLeft.stateName;

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
    super(hero, heroObj, RollLeft.stateName);
    this.gameHeight = gameHeight;
    this.enviGroundMargin = enviGroundMargin;
    this.enviGravity = enviGravity;
  }

  public keysHandler(keys: BaseKeys[]) {
    // handle hero stamina and energy states
    if (!this.hero.energy && this.hero.isOnGround())
      return this.hero.setState(HeroStates.IDLE, 0);

    if (
      !this.hero.energy &&
      !this.hero.isOnGround() &&
      this.hero.vy < this.heroObj.weight
    )
      return this.hero.setState(HeroStates.JUMP_LEFT, 0);

    if (
      !this.hero.energy &&
      !this.hero.isOnGround() &&
      this.hero.vy > this.heroObj.weight
    )
      return this.hero.setState(HeroStates.FALL_LEFT, 0);

    if (this.hero.energy) this.hero.energy -= 0.1;

    // add particles
    this.hero.particles.push(
      new Fire(
        this.hero.x + this.hero.width * 0.35,
        this.hero.y + this.hero.height * 0.6
      )
    );

    if (
      keys.includes(BaseKeys.ACTION) &&
      keys.includes(BaseKeys.RIGHT) &&
      keys.includes(BaseKeys.LEFT) &&
      this.hero.isOnGround()
    )
      return this.hero.setState(HeroStates.IDLE, 0);

    if (
      keys.includes(BaseKeys.ACTION) &&
      keys.includes(BaseKeys.RIGHT) &&
      keys.includes(BaseKeys.LEFT) &&
      !this.hero.isOnGround()
    )
      return this.hero.setState(HeroStates.ROLL_LEFT, 0);

    if (!keys.includes(BaseKeys.LEFT) && this.hero.isOnGround())
      return this.hero.setState(HeroStates.IDLE, 0);

    if (
      !keys.includes(BaseKeys.ACTION) &&
      keys.includes(BaseKeys.LEFT) &&
      this.hero.isOnGround()
    )
      return this.hero.setState(HeroStates.RUN_LEFT, 0);

    if (
      !keys.includes(BaseKeys.ACTION) &&
      keys.includes(BaseKeys.RIGHT) &&
      this.hero.isOnGround()
    )
      return this.hero.setState(HeroStates.RUN_RIGHT, 2);

    if (keys.includes(BaseKeys.ACTION) && keys.includes(BaseKeys.RIGHT))
      return this.hero.setState(HeroStates.ROLL_RIGHT, 2);

    // return to jump state if stopped attk
    if (
      !keys.includes(BaseKeys.ACTION) &&
      keys.includes(BaseKeys.RIGHT) &&
      !this.hero.isOnGround() &&
      this.hero.vy < this.heroObj.weight
    )
      return this.hero.setState(HeroStates.JUMP_RIGHT, 2);

    if (
      !keys.includes(BaseKeys.ACTION) &&
      !this.hero.isOnGround() &&
      this.hero.vy < this.heroObj.weight
    )
      return this.hero.setState(HeroStates.JUMP_LEFT, 0);

    if (
      !keys.includes(BaseKeys.ACTION) &&
      keys.includes(BaseKeys.RIGHT) &&
      !this.hero.isOnGround()
    )
      return this.hero.setState(HeroStates.FALL_RIGHT, 1);

    if (!keys.includes(BaseKeys.ACTION) && !this.hero.isOnGround())
      return this.hero.setState(HeroStates.FALL_LEFT, 0);

    if (
      keys.includes(BaseKeys.ACTION) &&
      keys.includes(BaseKeys.UP) &&
      this.hero.isOnGround()
    )
      this.hero.vy = -this.calcJumpHeight(
        this.gameHeight,
        this.enviGroundMargin,
        this.hero.height,
        this.heroObj.weight,
        this.enviGravity
      );

    if (keys.includes(BaseKeys.DOWN) && !this.hero.isOnGround())
      return this.hero.setState(HeroStates.DIVE, 0);
  }
}

export default RollLeft;
