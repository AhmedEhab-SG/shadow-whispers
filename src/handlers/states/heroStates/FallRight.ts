import State from "../State";
import { HeroObj } from "../../../types/hero";
import HeroStates from "../../../enum/HeroStates";
import BaseKeys from "../../../enum/BaseKeys";
import Hero from "../../../classes/characters/heroes/Hero";

class FallRight extends State {
  public static readonly stateName = HeroStates.FALL_RIGHT;
  public readonly stateName = FallRight.stateName;

  public constructor(protected hero: Hero, protected heroObj: HeroObj) {
    super(hero, heroObj, FallRight.stateName);
  }

  public keysHandler(keys: BaseKeys[]) {
    // switch to dead or idle state after falling
    if (!this.hero.lives && this.hero.isOnGround())
      return this.hero.setState(HeroStates.DEAD, 0);

    if (this.hero.isOnGround()) return this.hero.setState(HeroStates.IDLE, 0);

    if (!this.hero.isOnGround() && keys.includes(BaseKeys.LEFT))
      return this.hero.setState(HeroStates.FALL_LEFT, 0);

    if (
      !this.hero.isOnGround() &&
      keys.includes(BaseKeys.RIGHT) &&
      keys.includes(BaseKeys.ACTION)
    )
      return this.hero.setState(HeroStates.ROLL_RIGHT, 2);

    if (!this.hero.isOnGround() && keys.includes(BaseKeys.ACTION))
      return this.hero.setState(HeroStates.ROLL_LEFT, 0);

    if (this.hero.isOnGround() && keys.includes(BaseKeys.RIGHT))
      return this.hero.setState(HeroStates.ROLL_RIGHT, 1);

    if (this.hero.isOnGround() && keys.includes(BaseKeys.LEFT))
      return this.hero.setState(HeroStates.ROLL_LEFT, 0);

    // to make the player dive
    if (keys.includes(BaseKeys.DOWN))
      return this.hero.setState(HeroStates.DIVE, 0);
  }
}

export default FallRight;
