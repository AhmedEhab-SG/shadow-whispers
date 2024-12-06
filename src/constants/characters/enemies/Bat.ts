import { EnemyObj, state } from "../../../types/enemy";
import EnemyStates from "../../../enum/EnemyStates";
import batImg from "../../../assets/sprite/enemies/bat.png";
import Enemies, { EnemiesTypes } from "../../../enum/Enemies";

class Bat {
  static id: number = 1;
  static name: Enemies = Enemies.BAT;
  static type: EnemiesTypes = EnemiesTypes.FLYING;
  static image: string = batImg;
  static weight: number = 0.8;
  static speed: number = 0.5;
  static fps: number = 20;
  static sprite = {
    width: 1758,
    height: 155,
  };
  static frame = {
    width: 293,
    height: 155,
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
      id: Bat.id,
      name: Bat.name,
      type: Bat.type,
      image: Bat.image,
      weight: Bat.weight,
      speed: Bat.speed,
      fps: Bat.fps,
      sprite: Bat.sprite,
      frame: Bat.frame,
      states: Bat.states,
    };
  }
}

export default Bat;
