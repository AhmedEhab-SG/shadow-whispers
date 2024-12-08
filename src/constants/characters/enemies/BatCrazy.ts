import { EnemyObj, state } from "../../../types/enemy";
import EnemyStates from "../../../enum/EnemyStates";
import batCrazyImg from "../../../assets/sprite/enemies/bat_crazy.png";
import Enemies, { EnemiesTypes } from "../../../enum/Enemies";

class BatCrazy {
  public static id: number = 2;
  public static name: Enemies = Enemies.BAT_CRAZY;
  public static type: EnemiesTypes = EnemiesTypes.FLYING;
  public static image: string = batCrazyImg;
  public static weight: number = 0.8;
  public static speed: number = 0.5;
  public static fps: number = 20;
  public static sprite = {
    width: 1904,
    height: 167,
  };
  public static frame = {
    width: 238,
    height: 167,
  };
  public static states: state[] = [
    {
      key: EnemyStates.ENGAGE,
      name: "ENGAGE",
      frameY: 0,
      maxFramesX: 7,
    },
  ];

  public static get enemyObj(): EnemyObj {
    return {
      id: BatCrazy.id,
      name: BatCrazy.name,
      type: BatCrazy.type,
      image: BatCrazy.image,
      weight: BatCrazy.weight,
      speed: BatCrazy.speed,
      fps: BatCrazy.fps,
      sprite: BatCrazy.sprite,
      frame: BatCrazy.frame,
      states: BatCrazy.states,
    };
  }
}

export default BatCrazy;
