import State from "../State";
import { HeroObj } from "../../../types/hero";
import HeroStates from "../../../enum/HeroStates";
import BaseKeys from "../../../enum/BaseKeys";
import Hero from "../../../classes/characters/heroes/Hero";

class Idle extends State {
  public static readonly stateName = HeroStates.IDLE;
  public readonly stateName = Idle.stateName;

  constructor(protected hero: Hero, protected heroObj: HeroObj) {
    super(hero, heroObj, Idle.stateName);
  }

  public keysHandler(keys: BaseKeys[]) {
    if (keys.includes(BaseKeys.RIGHT) && !keys.includes(BaseKeys.LEFT))
      return this.hero.setState(HeroStates.RUN_RIGHT, 1);

    if (keys.includes(BaseKeys.LEFT) && !keys.includes(BaseKeys.RIGHT))
      return this.hero.setState(HeroStates.RUN_LEFT, 0);

    if (keys.includes(BaseKeys.UP) && !keys.includes(BaseKeys.DOWN))
      return this.hero.setState(HeroStates.JUMP_LEFT, 0);

    if (keys.includes(BaseKeys.DOWN) && !this.hero.isOnGround())
      return this.hero.setState(HeroStates.DIVE, 0);

    if (keys.includes(BaseKeys.DOWN) && this.hero.isOnGround())
      return this.hero.setState(HeroStates.SIT, 0);
  }
}

export default Idle;
