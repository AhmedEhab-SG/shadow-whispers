import { HeroesTypesInstance } from "../../../types/hero";
import HeroesEnum from "../../../enum/Heroes";
import ShadowDog from "./heroTypes/ShadowDog";
import { GameStates } from "../../../types/game";

class Heroes {
  public static readonly HeroTypes = [ShadowDog];

  public constructor(
    private gameWidth: number,
    private gameHeight: number,
    private enviGroundMargin: number,
    private enviSkyMargin: number,
    private enviGravity: number,
    private gameSpeed: number,
    private maxGameSpeed: number,
    private score: number,
    private gameStates: GameStates
  ) {}

  public getHeroByName(uniqueName: HeroesEnum): HeroesTypesInstance {
    return new (Heroes.HeroTypes.find(
      (hero) => hero.uniqueName === uniqueName
    )!)(
      this.gameWidth,
      this.gameHeight,
      this.enviGroundMargin,
      this.enviSkyMargin,
      this.enviGravity,
      this.gameSpeed,
      this.maxGameSpeed,
      this.score,
      this.gameStates
    );
  }

  public getRandomHero(): HeroesTypesInstance {
    return new Heroes.HeroTypes[
      Math.floor(Math.random() * Heroes.HeroTypes.length)
    ](
      this.gameWidth,
      this.gameHeight,
      this.enviGroundMargin,
      this.enviSkyMargin,
      this.enviGravity,
      this.gameSpeed,
      this.maxGameSpeed,
      this.score,
      this.gameStates
    );
  }

  public get heroes(): HeroesTypesInstance[] {
    return Heroes.HeroTypes.map(
      (hero) =>
        new hero(
          this.gameWidth,
          this.gameHeight,
          this.enviGroundMargin,
          this.enviSkyMargin,
          this.enviGravity,
          this.gameSpeed,
          this.maxGameSpeed,
          this.score,
          this.gameStates
        )
    );
  }
}

export default Heroes;
