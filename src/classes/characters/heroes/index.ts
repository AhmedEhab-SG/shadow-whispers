import { HeroesTypesInstance } from "../../../types/hero";
import HeroesEnum from "../../../enum/Heroes";
import ShadowDog from "./heroTypes/ShadowDog";
import GameStatus from "../../../config/GameStatus";

class Heroes {
  public static readonly HeroTypes = [ShadowDog];

  public constructor(
    private gameWidth: number,
    private gameHeight: number,
    private enviGroundMargin: number,
    private enviGravity: number,
    private gameSpeed: number,
    private maxGameSpeed: number,
    private score: number,
    public gameStatus: GameStatus
  ) {}

  public getHeroByName(uniqueName: HeroesEnum): HeroesTypesInstance {
    return new (Heroes.HeroTypes.find(
      (hero) => hero.uniqueName === uniqueName
    )!)(
      this.gameWidth,
      this.gameHeight,
      this.enviGroundMargin,
      this.enviGravity,
      this.gameSpeed,
      this.maxGameSpeed,
      this.score,
      this.gameStatus
    );
  }

  public getRandomHero(): HeroesTypesInstance {
    return new Heroes.HeroTypes[
      Math.floor(Math.random() * Heroes.HeroTypes.length)
    ](
      this.gameWidth,
      this.gameHeight,
      this.enviGroundMargin,
      this.enviGravity,
      this.gameSpeed,
      this.maxGameSpeed,
      this.score,
      this.gameStatus
    );
  }

  public get heroes(): HeroesTypesInstance[] {
    return Heroes.HeroTypes.map(
      (hero) =>
        new hero(
          this.gameWidth,
          this.gameHeight,
          this.enviGroundMargin,
          this.enviGravity,
          this.gameSpeed,
          this.maxGameSpeed,
          this.score,
          this.gameStatus
        )
    );
  }
}

export default Heroes;
