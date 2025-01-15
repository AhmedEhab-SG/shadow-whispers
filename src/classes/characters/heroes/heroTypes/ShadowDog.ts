import Hero from "../Hero";
import ShadowDogObj from "../../../../constants/characters/heros/ShadowDog";
import { GameStates } from "../../../../types/game";

class ShadowDog extends Hero {
  public static readonly uniqueName = ShadowDogObj.name;
  public readonly uniqueName = ShadowDog.uniqueName;

  public constructor(
    gameWidth: number,
    gameHeight: number,
    enviGroundMargin: number,
    enviSkyMargin: number,
    enviGravity: number,
    gameSpeed: number,
    maxGameSpeed: number,
    score: number,
    gameStates: GameStates
  ) {
    super(
      ShadowDogObj.heroObj,
      gameWidth,
      gameHeight,
      enviGroundMargin,
      enviSkyMargin,
      enviGravity,
      gameSpeed,
      maxGameSpeed,
      score,
      gameStates
    );
  }
}

export default ShadowDog;
