import { EnemyObj, state } from "../../../types/enemy";
import EnemyStates from "../../../enum/EnemyStates";
import plantImg from "../../../assets/sprite/enemies/plant.png";
import Enemies, { EnemiesTypes } from "../../../enum/Enemies";

class Plant {
  public static id: number = 11;
  public static name: Enemies = Enemies.PLANT;
  public static type: EnemiesTypes = EnemiesTypes.GROUND_STATIC;
  public static image: string = plantImg;
  public static weight: number = 0.8;
  public static speed: number = 0.5;
  public static fps: number = 20;
  public static sprite = {
    width: 120,
    height: 87,
  };
  public static frame = {
    width: 60,
    height: 87,
  };
  public static states: state[] = [
    {
      key: EnemyStates.ENGAGE,
      name: "ENGAGE",
      frameY: 0,
      maxFramesX: 1,
    },
  ];

  public static get enemyObj(): EnemyObj {
    return {
      id: Plant.id,
      name: Plant.name,
      type: Plant.type,
      image: Plant.image,
      weight: Plant.weight,
      speed: Plant.speed,
      fps: Plant.fps,
      sprite: Plant.sprite,
      frame: Plant.frame,
      states: Plant.states,
    };
  }
}

export default Plant;
