import { EnemyObj, state } from "../../../types/enemy";
import EnemyStates from "../../../enum/EnemyStates";
import batImg from "../../../assets/sprite/enemies/bat.png";
import Enemies, { EnemiesTypes } from "../../../enum/Enemies";

class Bat {
  public static id: number = 1;
  public static name: Enemies = Enemies.BAT;
  public static type: EnemiesTypes = EnemiesTypes.FLYING;
  public static image: string = batImg;
  public static weight: number = 0.8;
  public static speed: number = 0.5;
  public static fps: number = 20;
  public static sprite = {
    width: 1758,
    height: 155,
  };
  public static frame = {
    width: 293,
    height: 155,
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
      id: Bat.id,
      name: Bat.name,
      type: Bat.type,
      image: Bat.image,
      weight: Bat.weight,
      speed: Bat.speed,
      fps: Bat.fps,
      sprite: Bat.sprite,
      frame: Bat.frame,
      states: Bat.states,
    };
  }
}

export default Bat;
