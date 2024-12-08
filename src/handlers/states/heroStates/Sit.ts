import State from "../State";
import Hero from "../../../classes/characters/heroes/Hero";
import { HeroObj } from "../../../types/hero";
import HeroStates from "../../../enum/HeroStates";
import BaseKeys from "../../../enum/BaseKeys";

class Sit extends State {
  public static readonly stateName = HeroStates.SIT;
  public readonly stateName = Sit.stateName;

  public constructor(protected hero: Hero, protected heroObj: HeroObj) {
    super(hero, heroObj, Sit.stateName);
  }

  public keysHandler(keys: BaseKeys[]) {
    this.hero.vx = 0;

    if (keys.includes(BaseKeys.RIGHT) && !keys.includes(BaseKeys.DOWN))
      return this.hero.setState(HeroStates.RUN_RIGHT, 1);

    if (keys.includes(BaseKeys.LEFT) && !keys.includes(BaseKeys.DOWN))
      return this.hero.setState(HeroStates.RUN_LEFT, 0);

    if (
      keys.includes(BaseKeys.ACTION) &&
      this.hero.energy &&
      keys.includes(BaseKeys.RIGHT)
    )
      return this.hero.setState(HeroStates.ROLL_RIGHT, 2);

    if (
      keys.includes(BaseKeys.ACTION) &&
      this.hero.energy &&
      keys.includes(BaseKeys.LEFT)
    )
      return this.hero.setState(HeroStates.ROLL_RIGHT, 0);

    if (
      keys.includes(BaseKeys.ACTION) &&
      this.hero.energy &&
      keys.includes(BaseKeys.UP)
    )
      return this.hero.setState(HeroStates.JUMP_LEFT, 0);
  }
}

export default Sit;
