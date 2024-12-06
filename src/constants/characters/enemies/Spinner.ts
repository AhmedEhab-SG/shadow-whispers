import { EnemyObj, state } from "../../../types/enemy";
import EnemyStates from "../../../enum/EnemyStates";
import spinnerImg from "../../../assets/sprite/enemies/spinner.png";
import Enemies, { EnemiesTypes } from "../../../enum/Enemies";

class Spinner {
  static id: number = 16;
  static name: Enemies = Enemies.SPINNER;
  static type: EnemiesTypes = EnemiesTypes.FLYING;
  static image: string = spinnerImg;
  static weight: number = 0.8;
  static speed: number = 0.5;
  static fps: number = 20;
  static sprite = {
    width: 1917,
    height: 212,
  };
  static frame = {
    width: 213,
    height: 212,
  };
  static states: state[] = [
    {
      key: EnemyStates.ENGAGE,
      name: "ENGAGE",
      frameY: 0,
      maxFramesX: 8,
    },
  ];

  static get enemyObj(): EnemyObj {
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
