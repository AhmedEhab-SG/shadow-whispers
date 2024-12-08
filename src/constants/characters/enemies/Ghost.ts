import { EnemyObj, state } from "../../../types/enemy";
import EnemyStates from "../../../enum/EnemyStates";
import ghostImg from "../../../assets/sprite/enemies/ghost.png";
import Enemies, { EnemiesTypes } from "../../../enum/Enemies";

class Ghost {
  public static id: number = 6;
  public static name: Enemies = Enemies.GHOST;
  public static type: EnemiesTypes = EnemiesTypes.FLYING;
  public static image: string = ghostImg;
  public static weight: number = 0.8;
  public static speed: number = 0.5;
  public static fps: number = 20;
  public static sprite = {
    width: 1308,
    height: 177,
  };
  public static frame = {
    width: 218,
    height: 177,
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
      id: Ghost.id,
      name: Ghost.name,
      type: Ghost.type,
      image: Ghost.image,
      weight: Ghost.weight,
      speed: Ghost.speed,
      fps: Ghost.fps,
      sprite: Ghost.sprite,
      frame: Ghost.frame,
      states: Ghost.states,
    };
  }
}

export default Ghost;
