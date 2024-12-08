import Hero from "../Hero";
import ShadowDogObj from "../../../../constants/characters/heros/ShadowDog";
import GameStatus from "../../../../config/GameStatus";

class ShadowDog extends Hero {
  public static readonly uniqueName = ShadowDogObj.name;
  public readonly uniqueName = ShadowDog.uniqueName;

  public constructor(
    gameWidth: number,
    gameHeight: number,
    enviGroundMargin: number,
    enviGravity: number,
    gameSpeed: number,
    maxGameSpeed: number,
    score: number,
    gameStatus: GameStatus
  ) {
    super(
      ShadowDogObj.heroObj,
      gameWidth,
      gameHeight,
      enviGroundMargin,
      enviGravity,
      gameSpeed,
      maxGameSpeed,
      score,
      gameStatus
    );
  }
}

export default ShadowDog;
