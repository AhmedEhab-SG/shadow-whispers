import { EnemyObj, state } from "../../../types/enemy";
import EnemyStates from "../../../enum/EnemyStates";
import plantImg from "../../../assets/sprite/enemies/plant.png";
import Enemies, { EnemiesTypes } from "../../../enum/Enemies";

class Plant {
  static id: number = 11;
  static name: Enemies = Enemies.PLANT;
  static type: EnemiesTypes = EnemiesTypes.GROUND_STATIC;
  static image: string = plantImg;
  static weight: number = 0.8;
  static speed: number = 0.5;
  static fps: number = 20;
  static sprite = {
    width: 120,
    height: 87,
  };
  static frame = {
    width: 60,
    height: 87,
  };
  static states: state[] = [
    {
      key: EnemyStates.ENGAGE,
      name: "ENGAGE",
      frameY: 0,
      maxFramesX: 1,
    },
  ];

  static get enemyObj(): EnemyObj {
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
