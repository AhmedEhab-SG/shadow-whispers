import { EnemyObj, state } from "../../../types/enemy";
import EnemyStates from "../../../enum/EnemyStates";
import spinnerImg from "../../../assets/sprite/enemies/spinner.png";
import Enemies, { EnemiesTypes } from "../../../enum/Enemies";

class Spinner {
  public static id: number = 16;
  public static name: Enemies = Enemies.SPINNER;
  public static type: EnemiesTypes = EnemiesTypes.FLYING;
  public static image: string = spinnerImg;
  public static weight: number = 0.8;
  public static speed: number = 0.5;
  public static fps: number = 20;
  public static sprite = {
    width: 1917,
    height: 212,
  };
  public static frame = {
    width: 213,
    height: 212,
  };
  public static states: state[] = [
    {
      key: EnemyStates.ENGAGE,
      name: "ENGAGE",
      frameY: 0,
      maxFramesX: 8,
    },
  ];

  public static get enemyObj(): EnemyObj {
    return {
      id: Spinner.id,
      name: Spinner.name,
      type: Spinner.type,
      image: Spinner.image,
      weight: Spinner.weight,
      speed: Spinner.speed,
      fps: Spinner.fps,
      sprite: Spinner.sprite,
      frame: Spinner.frame,
      states: Spinner.states,
    };
  }
}

export default Spinner;
