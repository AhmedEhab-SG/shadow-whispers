import { EnemyObj, state } from "../../../types/enemy";
import EnemyStates from "../../../enum/EnemyStates";
import birdImg from "../../../assets/sprite/enemies/bird.png";
import Enemies, { EnemiesTypes } from "../../../enum/Enemies";

class Bird {
  static id: number = 3;
  static name: Enemies = Enemies.BIRD;
  static type: EnemiesTypes = EnemiesTypes.FLYING;
  static image: string = birdImg;
  static weight: number = 0.8;
  static speed: number = 0.5;
  static fps: number = 20;
  static sprite = {
    width: 1904,
    height: 188,
  };
  static frame = {
    width: 266,
    height: 188,
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
      id: Bird.id,
      name: Bird.name,
      type: Bird.type,
      image: Bird.image,
      weight: Bird.weight,
      speed: Bird.speed,
      fps: Bird.fps,
      sprite: Bird.sprite,
      frame: Bird.frame,
      states: Bird.states,
    };
  }
}

export default Bird;
