import { EnemyObj, state } from "../../../types/enemy";
import EnemyStates from "../../../enum/EnemyStates";
import ravenImg from "../../../assets/sprite/enemies/raven.png";
import Enemies, { EnemiesTypes } from "../../../enum/Enemies";

class Raven {
  public static id: number = 12;
  public static name: Enemies = Enemies.RAVEN;
  public static type: EnemiesTypes = EnemiesTypes.FLYING;
  public static image: string = ravenImg;
  public static weight: number = 0.8;
  public static speed: number = 0.5;
  public static fps: number = 20;
  public static sprite = {
    width: 1626,
    height: 194,
  };
  public static frame = {
    width: 271,
    height: 194,
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
      id: Raven.id,
      name: Raven.name,
      type: Raven.type,
      image: Raven.image,
      weight: Raven.weight,
      speed: Raven.speed,
      fps: Raven.fps,
      sprite: Raven.sprite,
      frame: Raven.frame,
      states: Raven.states,
    };
  }
}

export default Raven;
