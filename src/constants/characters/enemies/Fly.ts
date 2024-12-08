import { EnemyObj, state } from "../../../types/enemy";
import EnemyStates from "../../../enum/EnemyStates";
import flyImg from "../../../assets/sprite/enemies/fly.png";
import Enemies, { EnemiesTypes } from "../../../enum/Enemies";

class Fly {
  public static id: number = 5;
  public static name: Enemies = Enemies.FLY;
  public static type: EnemiesTypes = EnemiesTypes.FLYING;
  public static image: string = flyImg;
  public static weight: number = 0.8;
  public static speed: number = 0.5;
  public static fps: number = 20;
  public static sprite = {
    width: 360,
    height: 44,
  };
  public static frame = {
    width: 60,
    height: 44,
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
