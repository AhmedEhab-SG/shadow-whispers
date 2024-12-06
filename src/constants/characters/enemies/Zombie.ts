import { EnemyObj, state } from "../../../types/enemy";
import EnemyStates from "../../../enum/EnemyStates";
import zombieImg from "../../../assets/sprite/enemies/zombie.png";
import Enemies, { EnemiesTypes } from "../../../enum/Enemies";

class Zombie {
  static id: number = 17;
  static name: Enemies = Enemies.ZOMBIE;
  static type: EnemiesTypes = EnemiesTypes.GROUND;
  static image: string = zombieImg;
  static weight: number = 0.8;
  static speed: number = 0.5;
  static fps: number = 20;
  static sprite = {
    width: 2236,
    height: 410,
  };
  static frame = {
    width: 292,
    height: 410,
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
      id: Zombie.id,
      name: Zombie.name,
      type: Zombie.type,
      image: Zombie.image,
      weight: Zombie.weight,
      speed: Zombie.speed,
      fps: Zombie.fps,
      sprite: Zombie.sprite,
      frame: Zombie.frame,
      states: Zombie.states,
    };
  }
}

export default Zombie;
