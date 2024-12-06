import { EnemyObj, state } from "../../../types/enemy";
import EnemyStates from "../../../enum/EnemyStates";
import ghostGloomyImg from "../../../assets/sprite/enemies/ghost_gloomy.png";
import Enemies, { EnemiesTypes } from "../../../enum/Enemies";

class GhostGloomy {
  static id: number = 9;
  static name: Enemies = Enemies.GHOST_GLOOMY;
  static type: EnemiesTypes = EnemiesTypes.FLYING;
  static image: string = ghostGloomyImg;
  static weight: number = 0.8;
  static speed: number = 0.5;
  static fps: number = 20;
  static sprite = {
    width: 160,
    height: 89,
  };
  static frame = {
    width: 80,
    height: 89,
  };
  static states: state[] = [
    {
      key: EnemyStates.ENGAGE,
      name: "ENGAGE",
      frameY: 0,
      maxFramesX: 1,
    },
  ];

  static get enemyObj(): EnemyObj {
    return {
      id: GhostGloomy.id,
      name: GhostGloomy.name,
      type: GhostGloomy.type,
      image: GhostGloomy.image,
      weight: GhostGloomy.weight,
      speed: GhostGloomy.speed,
      fps: GhostGloomy.fps,
      sprite: GhostGloomy.sprite,
      frame: GhostGloomy.frame,
      states: GhostGloomy.states,
    };
  }
}

export default GhostGloomy;
