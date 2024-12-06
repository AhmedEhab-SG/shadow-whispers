import { EnemyObj, state } from "../../../types/enemy";
import EnemyStates from "../../../enum/EnemyStates";
import batCrazyImg from "../../../assets/sprite/enemies/bat_crazy.png";
import Enemies, { EnemiesTypes } from "../../../enum/Enemies";

class BatCrazy {
  static id: number = 2;
  static name: Enemies = Enemies.BAT_CRAZY;
  static type: EnemiesTypes = EnemiesTypes.FLYING;
  static image: string = batCrazyImg;
  static weight: number = 0.8;
  static speed: number = 0.5;
  static fps: number = 20;
  static sprite = {
    width: 1904,
    height: 167,
  };
  static frame = {
    width: 238,
    height: 167,
  };
  static states: state[] = [
    {
      key: EnemyStates.ENGAGE,
      name: "ENGAGE",
      frameY: 0,
      maxFramesX: 7,
    },
  ];

  static get enemyObj(): EnemyObj {
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
