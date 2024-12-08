import { EnemyObj, state } from "../../../types/enemy";
import EnemyStates from "../../../enum/EnemyStates";
import zombieGroundImg from "../../../assets/sprite/enemies/zombie_ground.png";
import Enemies, { EnemiesTypes } from "../../../enum/Enemies";

class ZombieGround {
  public static id: number = 18;
  public static name: Enemies = Enemies.ZOMBIE_GROUND;
  public static type: EnemiesTypes = EnemiesTypes.GROUND_STATIC;
  public static image: string = zombieGroundImg;
  public static weight: number = 0.8;
  public static speed: number = 0.5;
  public static fps: number = 20;
  public static sprite = {
    width: 961,
    height: 90,
  };
  public static frame = {
    width: 120.12,
    height: 90,
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
