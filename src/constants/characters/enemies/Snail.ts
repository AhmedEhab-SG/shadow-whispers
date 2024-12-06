import { EnemyObj, state } from "../../../types/enemy";
import EnemyStates from "../../../enum/EnemyStates";
import snailImg from "../../../assets/sprite/enemies/snail.png";
import Enemies, { EnemiesTypes } from "../../../enum/Enemies";

class Snail {
  static id: number = 13;
  static name: Enemies = Enemies.SNAIL;
  static type: EnemiesTypes = EnemiesTypes.GROUND_STATIC;
  static image: string = snailImg;
  static weight: number = 0.8;
  static speed: number = 0.5;
  static fps: number = 20;
  static sprite = {
    width: 960,
    height: 119,
  };
  static frame = {
    width: 160,
    height: 119,
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
      id: Snail.id,
      name: Snail.name,
      type: Snail.type,
      image: Snail.image,
      weight: Snail.weight,
      speed: Snail.speed,
      fps: Snail.fps,
      sprite: Snail.sprite,
      frame: Snail.frame,
      states: Snail.states,
    };
  }
}

export default Snail;
