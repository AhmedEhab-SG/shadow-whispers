import State from "../State";
import { HeroObj } from "../../../types/hero";
import HeroStates from "../../../enum/HeroStates";
import BaseKeys from "../../../enum/BaseKeys";
import Hero from "../../../classes/characters/heroes/Hero";

class FallLeft extends State {
  public static readonly stateName = HeroStates.FALL_LEFT;
  public readonly stateName = FallLeft.stateName;

  constructor(protected hero: Hero, protected heroObj: HeroObj) {
    super(hero, heroObj, FallLeft.stateName);
  }

  public keysHandler(keys: BaseKeys[]) {
    if (!this.hero.lives && this.hero.isOnGround())
      return this.hero.setState(HeroStates.DEAD, 0);

    // switch to dead state after falling

    if (this.hero.isOnGround()) return this.hero.setState(HeroStates.IDLE, 0);

    if (
      !this.hero.isOnGround() &&
      keys.includes(BaseKeys.RIGHT) &&
      keys.includes(BaseKeys.ACTION)
    )
      return this.hero.setState(HeroStates.ROLL_RIGHT, 2);

    if (!this.hero.isOnGround() && keys.includes(BaseKeys.ACTION))
      return this.hero.setState(HeroStates.ROLL_LEFT, 0);

    if (this.hero.isOnGround() && keys.includes(BaseKeys.RIGHT))
      return this.hero.setState(HeroStates.RUN_RIGHT, 1);

    if (this.hero.isOnGround() && keys.includes(BaseKeys.LEFT))
      return this.hero.setState(HeroStates.RUN_LEFT, 0);

    if (keys.includes(BaseKeys.DOWN))
      return this.hero.setState(HeroStates.DIVE, 0); // to make the player dive
  }
}

export default FallLeft;
