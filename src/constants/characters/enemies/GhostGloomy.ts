import { EnemyObj, state } from "../../../types/enemy";
import EnemyStates from "../../../enum/EnemyStates";
import ghostGloomyImg from "../../../assets/sprite/enemies/ghost_gloomy.png";
import Enemies, { EnemiesTypes } from "../../../enum/Enemies";

class GhostGloomy {
  public static id: number = 9;
  public static name: Enemies = Enemies.GHOST_GLOOMY;
  public static type: EnemiesTypes = EnemiesTypes.FLYING;
  public static image: string = ghostGloomyImg;
  public static weight: number = 0.8;
  public static speed: number = 0.5;
  public static fps: number = 20;
  public static sprite = {
    width: 160,
    height: 89,
  };
  public static frame = {
    width: 80,
    height: 89,
  };
  public static states: state[] = [
    {
      key: EnemyStates.ENGAGE,
      name: "ENGAGE",
      frameY: 0,
      maxFramesX: 1,
    },
  ];

  public static get enemyObj(): EnemyObj {
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
