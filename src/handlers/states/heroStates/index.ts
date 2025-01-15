import Idle from "./Idle";
import JumpRight from "./JumpRight";
import JumpLeft from "./JumpLeft";
import FallRight from "./FallRight";
import FallLeft from "./FallLeft";
import RollRight from "./RollRight";
import Dive from "./Dive";
import Sit from "./Sit";
import Dizzy from "./Dizzy";
import Dead from "./Dead";
import RunRight from "./RunRight";
import RunLeft from "./RunLeft";
import RollLeft from "./RollLeft";
import Hero from "../../../classes/characters/heroes/Hero";
import { HeroObj, HeroStateInstance } from "../../../types/hero";
import HeroStatesEnum from "../../../enum/HeroStates";

class HeroStates {
  public static readonly States = [
    Idle,
    RunRight,
    RunLeft,
    JumpRight,
    JumpLeft,
    FallRight,
    FallLeft,
    RollRight,
    RollLeft,
    Dive,
    Sit,
    Dizzy,
    Dead,
  ];

  public States: InstanceType<(typeof HeroStates.States)[number]>[];

  private gameHeight: number;
  private enviGroundMargin: number;
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
    this.gameHeight = gameHeight;
    this.enviGroundMargin = enviGroundMargin;
    this.enviGravity = enviGravity;

    this.States = HeroStates.States.map((StateClass) => {
      return new StateClass(this.hero, this.heroObj, {
        gameHeight: this.gameHeight,
        enviGroundMargin: this.enviGroundMargin,
        enviSkyMargin: enviSkyMargin,
        enviGravity: this.enviGravity,
      });
    });
  }

  public getState(stateName: HeroStatesEnum): HeroStateInstance {
    return this.States.find((state) => state.stateName === stateName)!;
  }
}

export default HeroStates;
