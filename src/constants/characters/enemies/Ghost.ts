import { EnemyObj, state } from "../../../types/enemy";
import EnemyStates from "../../../enum/EnemyStates";
import ghostImg from "../../../assets/sprite/enemies/ghost.png";
import Enemies, { EnemiesTypes } from "../../../enum/Enemies";

class Ghost {
  static id: number = 6;
  static name: Enemies = Enemies.GHOST;
  static type: EnemiesTypes = EnemiesTypes.FLYING;
  static image: string = ghostImg;
  static weight: number = 0.8;
  static speed: number = 0.5;
  static fps: number = 20;
  static sprite = {
    width: 1308,
    height: 177,
  };
  static frame = {
    width: 218,
    height: 177,
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
      id: Ghost.id,
      name: Ghost.name,
      type: Ghost.type,
      image: Ghost.image,
      weight: Ghost.weight,
      speed: Ghost.speed,
      fps: Ghost.fps,
      sprite: Ghost.sprite,
      frame: Ghost.frame,
      states: Ghost.states,
    };
  }
}

export default Ghost;
