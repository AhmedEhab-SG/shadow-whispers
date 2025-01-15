import State from "../State";
import Hero from "../../../classes/characters/heroes/Hero";
import { HeroObj } from "../../../types/hero";
import HeroStates from "../../../enum/HeroStates";
import BaseKeys from "../../../enum/BaseKeys";
import Fire from "../../../classes/vfx/particles/Fire";

class RollRight extends State {
  public static readonly stateName = HeroStates.ROLL_RIGHT;
  public readonly stateName = RollRight.stateName;

  private gameHeight: number;
  private enviGroundMargin: number;
  private enviSkyMargin: number;
  private enviGravity: number;

  public constructor(
    protected hero: Hero,
    protected heroObj: HeroObj,
    {
      gameHeight,
      enviGroundMargin,
      enviSkyMargin,
      enviGravity,
    }: {
      gameHeight: number;
      enviGroundMargin: number;
      enviSkyMargin: number;
      enviGravity: number;
    }
  ) {
    super(hero, heroObj, RollRight.stateName);
    this.gameHeight = gameHeight;
    this.enviGroundMargin = enviGroundMargin;
    this.enviGravity = enviGravity;
    this.enviSkyMargin = enviSkyMargin;
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
      return this.hero.setState(HeroStates.JUMP_RIGHT, 2);

    if (
      !this.hero.energy &&
      !this.hero.isOnGround() &&
      this.hero.vy > this.heroObj.weight
    )
      return this.hero.setState(HeroStates.FALL_RIGHT, 2);

    if (this.hero.energy) this.hero.energy -= 0.1;

    //add particles
    this.hero.particles.push(
      new Fire(
        this.hero.x + this.hero.width * 0.75,
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

    if (!keys.includes(BaseKeys.RIGHT) && this.hero.isOnGround())
      return this.hero.setState(HeroStates.IDLE, 0);

    if (
      !keys.includes(BaseKeys.ACTION) &&
      keys.includes(BaseKeys.RIGHT) &&
      this.hero.isOnGround()
    )
      return this.hero.setState(HeroStates.RUN_RIGHT, 1);

    if (
      !keys.includes(BaseKeys.ACTION) &&
      keys.includes(BaseKeys.LEFT) &&
      this.hero.isOnGround()
    )
      return this.hero.setState(HeroStates.RUN_LEFT, 0);

    if (keys.includes(BaseKeys.ACTION) && keys.includes(BaseKeys.LEFT))
      return this.hero.setState(HeroStates.ROLL_LEFT, 0);

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

    //handle jump and dive
    if (
      keys.includes(BaseKeys.ACTION) &&
      keys.includes(BaseKeys.UP) &&
      this.hero.isOnGround()
    )
      this.hero.vy = -this.calcJumpHeight(
        this.gameHeight,
        this.enviGroundMargin,
        this.enviSkyMargin,
        this.hero.height,
        this.heroObj.weight,
        this.enviGravity
      );

    if (keys.includes(BaseKeys.DOWN) && !this.hero.isOnGround())
      return this.hero.setState(HeroStates.DIVE, 0);
  }
}

export default RollRight;
