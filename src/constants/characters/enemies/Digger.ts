import { EnemyObj, state } from "../../../types/enemy";
import EnemyStates from "../../../enum/EnemyStates";
import diggerImg from "../../../assets/sprite/enemies/digger.png";
import Enemies, { EnemiesTypes } from "../../../enum/Enemies";

class Digger {
  public static id: number = 4;
  public static name: Enemies = Enemies.DIGGER;
  public static type: EnemiesTypes = EnemiesTypes.GROUND_STATIC;
  public static image: string = diggerImg;
  public static weight: number = 0.8;
  public static speed: number = 0.5;
  public static fps: number = 20;
  public static sprite = {
    width: 2080,
    height: 178,
  };
  public static frame = {
    width: 260,
    height: 178,
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
      id: Digger.id,
      name: Digger.name,
      type: Digger.type,
      image: Digger.image,
      weight: Digger.weight,
      speed: Digger.speed,
      fps: Digger.fps,
      sprite: Digger.sprite,
      frame: Digger.frame,
      states: Digger.states,
    };
  }
}

export default Digger;
