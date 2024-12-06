import { EnemyObj, state } from "../../../types/enemy";
import EnemyStates from "../../../enum/EnemyStates";
import ravenImg from "../../../assets/sprite/enemies/raven.png";
import Enemies, { EnemiesTypes } from "../../../enum/Enemies";

class Raven {
  static id: number = 12;
  static name: Enemies = Enemies.RAVEN;
  static type: EnemiesTypes = EnemiesTypes.FLYING;
  static image: string = ravenImg;
  static weight: number = 0.8;
  static speed: number = 0.5;
  static fps: number = 20;
  static sprite = {
    width: 1626,
    height: 194,
  };
  static frame = {
    width: 271,
    height: 194,
  };
  static states: state[] = [
    {
      key: EnemyStates.ENGAGE,
      name: "ENGAGE",
      frameY: 0,
      maxFramesX: 5,
    },
  ];

  static get enemyObj(): EnemyObj {
    return {
      id: Raven.id,
      name: Raven.name,
      type: Raven.type,
      image: Raven.image,
      weight: Raven.weight,
      speed: Raven.speed,
      fps: Raven.fps,
      sprite: Raven.sprite,
      frame: Raven.frame,
      states: Raven.states,
    };
  }
}

export default Raven;
