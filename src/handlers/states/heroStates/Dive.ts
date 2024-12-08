import State from "../State";
import { HeroObj } from "../../../types/hero";
import HeroStates from "../../../enum/HeroStates";
import Hero from "../../../classes/characters/heroes/Hero";
import BaseKeys from "../../../enum/BaseKeys";
import Fire from "../../../classes/vfx/particles/Fire";
import Splash from "../../../classes/vfx/particles/Splash";

class Dive extends State {
  public static readonly stateName = HeroStates.DIVE;
  public readonly stateName = Dive.stateName;

  private enviGravity: number;

  public constructor(
    protected hero: Hero,
    protected heroObj: HeroObj,
    { enviGravity }: { enviGravity: number }
  ) {
    super(hero, heroObj, Dive.stateName);
    this.enviGravity = enviGravity;
  }

  public enter() {
    super.enter();

    // to make the player dive faster
    this.hero.vy += 15 / this.heroObj.weight;
  }

  public keysHandler(keys: BaseKeys[]) {
    if (!this.hero) return;

    if (!this.hero.lives) return this.hero.setState(HeroStates.FALL_LEFT, 0);

    // add particles
    this.hero.particles.push(
      new Fire(
        this.hero.x + this.hero.width * 0.55,
        this.hero.y + this.hero.height * 0.6
      )
    );

    // to make the player dive when on the ground
    if (this.hero.isOnGround()) {
      //spash must be in exit method refactor is required
      for (let i = 0; i < 30; i++) {
        this.hero.particles.unshift(
          new Splash(
            this.hero.x + this.hero.width,
            this.hero.y + this.hero.height,
            this.enviGravity
          )
        );
      }

      return this.hero.setState(HeroStates.IDLE, 0);
    }

    // to make the player roll when on the ground
    if (
      keys.includes(BaseKeys.ACTION) &&
      this.hero.isOnGround() &&
      this.hero.energy &&
      keys.includes(BaseKeys.RIGHT)
    )
      return this.hero.setState(HeroStates.ROLL_RIGHT, 2);

    if (
      keys.includes(BaseKeys.LEFT) &&
      this.hero.isOnGround() &&
      this.hero.energy &&
      keys.includes(BaseKeys.LEFT)
    )
      return this.hero.setState(HeroStates.ROLL_RIGHT, 0);
  }
}

export default Dive;
