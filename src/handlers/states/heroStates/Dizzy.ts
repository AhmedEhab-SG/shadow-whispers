import State from "../State";
import { HeroObj } from "../../../types/hero";
import HeroStates from "../../../enum/HeroStates";
import BaseKeys from "../../../enum/BaseKeys";
import Hero from "../../../classes/characters/heroes/Hero";

class Dizzy extends State {
  public static readonly stateName = HeroStates.DIZZY;
  public readonly stateName = Dizzy.stateName;

  public constructor(protected hero: Hero, protected heroObj: HeroObj) {
    super(hero, heroObj, Dizzy.stateName);
  }

  public enter(): void {
    super.enter();
    if (this.hero.lives) this.hero.lives -= 1;
  }

  public keysHandler(_keys: BaseKeys[]) {
    if (!this.hero) return;

    this.hero.vx = 0;

    // switch to dead state after falling
    if (!this.hero.lives) return this.hero.setState(HeroStates.DEAD, 0);

    //exit rolling state and go to running state
    if (this.hero.frameX >= this.hero.maxFrameX && this.hero.isOnGround())
      return this.hero.setState(HeroStates.IDLE, 0);

    //exit rolling state and go to falling state bec its on air
    if (this.hero.frameX >= this.hero.maxFrameX && !this.hero.isOnGround())
      return this.hero.setState(HeroStates.FALL_LEFT, 0);
  }
}

export default Dizzy;
