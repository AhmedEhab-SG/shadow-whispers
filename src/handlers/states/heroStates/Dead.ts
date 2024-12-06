import State from "../State";
import { HeroObj } from "../../../types/hero";
import HeroStates from "../../../enum/HeroStates";
import Hero from "../../../classes/characters/heroes/Hero";
import BaseKeys from "../../../enum/BaseKeys";
import GameStatus from "../../../config/GameStatus";

class Dead extends State {
  public static readonly stateName = HeroStates.DEAD;
  public readonly stateName = Dead.stateName;

  constructor(protected hero: Hero, protected heroObj: HeroObj) {
    super(hero, heroObj, Dead.stateName);
  }

  public keysHandler(_keys: BaseKeys[]) {
    if (!this.hero) return;

    this.hero.vx = 0;

    if (!this.hero.isOnGround()) this.hero.setState(HeroStates.FALL_LEFT, 0);

    //switch to falling state and then die

    if (this.hero.frameX >= this.hero.maxFrameX && this.hero.isOnGround())
      this.hero.gameStatus = GameStatus.OVER;

    //stops the game
  }
}

export default Dead;
