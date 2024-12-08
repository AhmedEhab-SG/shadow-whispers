import { EnemyObj, state } from "../../../types/enemy";
import EnemyStates from "../../../enum/EnemyStates";
import birdImg from "../../../assets/sprite/enemies/bird.png";
import Enemies, { EnemiesTypes } from "../../../enum/Enemies";

class Bird {
  public static id: number = 3;
  public static name: Enemies = Enemies.BIRD;
  public static type: EnemiesTypes = EnemiesTypes.FLYING;
  public static image: string = birdImg;
  public static weight: number = 0.8;
  public static speed: number = 0.5;
  public static fps: number = 20;
  public static sprite = {
    width: 1904,
    height: 188,
  };
  public static frame = {
    width: 266,
    height: 188,
  };
  public static states: state[] = [
    {
      key: EnemyStates.ENGAGE,
      name: "ENGAGE",
      frameY: 0,
      maxFramesX: 5,
    },
  ];

  public static get enemyObj(): EnemyObj {
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
