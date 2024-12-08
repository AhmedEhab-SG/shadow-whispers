import { EnemyObj, state } from "../../../types/enemy";
import EnemyStates from "../../../enum/EnemyStates";
import zombieImg from "../../../assets/sprite/enemies/zombie.png";
import Enemies, { EnemiesTypes } from "../../../enum/Enemies";

class Zombie {
  public static id: number = 17;
  public static name: Enemies = Enemies.ZOMBIE;
  public static type: EnemiesTypes = EnemiesTypes.GROUND;
  public static image: string = zombieImg;
  public static weight: number = 0.8;
  public static speed: number = 0.5;
  public static fps: number = 20;
  public static sprite = {
    width: 2236,
    height: 410,
  };
  public static frame = {
    width: 292,
    height: 410,
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
