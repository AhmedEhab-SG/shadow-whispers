import { EnemyObj, state } from "../../../types/enemy";
import EnemyStates from "../../../enum/EnemyStates";
import zombieGroundImg from "../../../assets/sprite/enemies/zombie_ground.png";
import Enemies, { EnemiesTypes } from "../../../enum/Enemies";

class ZombieGround {
  static id: number = 18;
  static name: Enemies = Enemies.ZOMBIE_GROUND;
  static type: EnemiesTypes = EnemiesTypes.GROUND_STATIC;
  static image: string = zombieGroundImg;
  static weight: number = 0.8;
  static speed: number = 0.5;
  static fps: number = 20;
  static sprite = {
    width: 961,
    height: 90,
  };
  static frame = {
    width: 120.12,
    height: 90,
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
      id: ZombieGround.id,
      name: ZombieGround.name,
      type: ZombieGround.type,
      image: ZombieGround.image,
      weight: ZombieGround.weight,
      speed: ZombieGround.speed,
      fps: ZombieGround.fps,
      sprite: ZombieGround.sprite,
      frame: ZombieGround.frame,
      states: ZombieGround.states,
    };
  }
}

export default ZombieGround;
