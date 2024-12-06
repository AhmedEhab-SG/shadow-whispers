import { EnemyObj, state } from "../../../types/enemy";
import EnemyStates from "../../../enum/EnemyStates";
import flyImg from "../../../assets/sprite/enemies/fly.png";
import Enemies, { EnemiesTypes } from "../../../enum/Enemies";

class Fly {
  static id: number = 5;
  static name: Enemies = Enemies.FLY;
  static type: EnemiesTypes = EnemiesTypes.FLYING;
  static image: string = flyImg;
  static weight: number = 0.8;
  static speed: number = 0.5;
  static fps: number = 20;
  static sprite = {
    width: 360,
    height: 44,
  };
  static frame = {
    width: 60,
    height: 44,
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
      id: Fly.id,
      name: Fly.name,
      type: Fly.type,
      image: Fly.image,
      weight: Fly.weight,
      speed: Fly.speed,
      fps: Fly.fps,
      sprite: Fly.sprite,
      frame: Fly.frame,
      states: Fly.states,
    };
  }
}

export default Fly;
