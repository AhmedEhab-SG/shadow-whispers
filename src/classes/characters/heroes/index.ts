import { HeroesTypesInstance } from "../../../types/hero";
import HeroesEnum from "../../../enum/Heroes";
import ShadowDog from "./heroTypes/ShadowDog";
import GameStatus from "../../../config/GameStatus";
import { HeroObj } from "../../../types/hero";
import Particle from "../../vfx/particles/Particle";

class Heroes {
  public static readonly HeroTypes = [ShadowDog];

  public constructor(
    private heroObj: HeroObj,
    private gameWidth: number,
    private gameHeight: number,
    private enviGroundMargin: number,
    private enviGravity: number,
    private gameSpeed: number,
    private maxGameSpeed: number,
    public gameStatus: GameStatus,
    private score: number,
    private particles: Particle[]
  ) {}

  public getHeroByName(uniqueName: HeroesEnum): HeroesTypesInstance {
    return new (Heroes.HeroTypes.find(
      (hero) => hero.uniqueName === uniqueName
    )!)(
      this.heroObj,
      this.gameWidth,
      this.gameHeight,
      this.enviGroundMargin,
      this.enviGravity,
      this.gameSpeed,
      this.maxGameSpeed,
      this.gameStatus,
      this.score
    );
  }

  public getRandomHero(): HeroesTypesInstance {
    return new Heroes.HeroTypes[
      Math.floor(Math.random() * Heroes.HeroTypes.length)
    ](
      this.heroObj,
      this.gameWidth,
      this.gameHeight,
      this.enviGroundMargin,
      this.enviGravity,
      this.gameSpeed,
      this.maxGameSpeed,
      this.gameStatus,
      this.score
    );
  }

  public get heroes(): HeroesTypesInstance[] {
    return Heroes.HeroTypes.map(
      (hero) =>
        new hero(
          this.heroObj,
          this.gameWidth,
          this.gameHeight,
          this.enviGroundMargin,
          this.enviGravity,
          this.gameSpeed,
          this.maxGameSpeed,
          this.gameStatus,
          this.score
        )
    );
  }
}

export default Heroes;
