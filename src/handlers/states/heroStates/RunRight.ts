import State from "../State";
import Hero from "../../../classes/characters/heroes/Hero";
import { HeroObj } from "../../../types/hero";
import HeroStates from "../../../enum/HeroStates";
import BaseKeys from "../../../enum/BaseKeys";
import Dust from "../../../classes/vfx/particles/Dust";

class RunRight extends State {
  public static readonly stateName = HeroStates.RUN_RIGHT;
  public readonly stateName = RunRight.stateName;

  constructor(protected hero: Hero, protected heroObj: HeroObj) {
    super(hero, heroObj, RunRight.stateName);
  }

  public keysHandler(keys: BaseKeys[]) {
    // add particles
    this.hero.particles.push(
      new Dust(
        this.hero.x + this.hero.width * 0.6,
        this.hero.y + this.hero.height
      )
    );

    if (keys.includes(BaseKeys.UP) && keys.includes(BaseKeys.RIGHT))
      return this.hero.setState(HeroStates.JUMP_RIGHT, 1);

    if (
      keys.includes(BaseKeys.ACTION) &&
      this.hero.energy &&
      keys.includes(BaseKeys.RIGHT)
    )
      return this.hero.setState(HeroStates.ROLL_RIGHT, 2);

    if (keys.includes(BaseKeys.DOWN))
      return this.hero.setState(HeroStates.SIT, 0);

    //to enter idle state
    if (!keys.includes(BaseKeys.RIGHT))
      return this.hero.setState(HeroStates.IDLE, 0);
  }
}

export default RunRight;
