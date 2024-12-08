import State from "../State";
import Hero from "../../../classes/characters/heroes/Hero";
import { HeroObj } from "../../../types/hero";
import HeroStates from "../../../enum/HeroStates";
import BaseKeys from "../../../enum/BaseKeys";
import Dust from "../../../classes/vfx/particles/Dust";

class RunLeft extends State {
  public static readonly stateName = HeroStates.RUN_LEFT;
  public readonly stateName = RunLeft.stateName;

  public constructor(protected hero: Hero, protected heroObj: HeroObj) {
    super(hero, heroObj, RunLeft.stateName);
  }

  public keysHandler(keys: BaseKeys[]) {
    ///add particles
    this.hero.particles.push(
      new Dust(
        this.hero.x + this.hero.width * 0.6,
        this.hero.y + this.hero.height
      )
    );

    if (keys.includes(BaseKeys.UP) && keys.includes(BaseKeys.LEFT))
      return this.hero.setState(HeroStates.JUMP_LEFT, 0);

    if (
      keys.includes(BaseKeys.ACTION) &&
      this.hero.energy &&
      keys.includes(BaseKeys.LEFT)
    )
      return this.hero.setState(HeroStates.ROLL_LEFT, 0);

    if (keys.includes(BaseKeys.DOWN))
      return this.hero.setState(HeroStates.SIT, 0);

    //to enter idle state
    if (!keys.includes(BaseKeys.LEFT))
      return this.hero.setState(HeroStates.IDLE, 0);
  }
}

export default RunLeft;
