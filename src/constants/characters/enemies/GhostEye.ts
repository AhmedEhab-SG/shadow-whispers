import { EnemyObj, state } from "../../../types/enemy";
import EnemyStates from "../../../enum/EnemyStates";
import ghostEyeImg from "../../../assets/sprite/enemies/ghost_eye.png";
import Enemies, { EnemiesTypes } from "../../../enum/Enemies";

class GhostEye {
  public static id: number = 7;
  public static name: Enemies = Enemies.GHOST_EYE;
  public static type: EnemiesTypes = EnemiesTypes.FLYING;
  public static image: string = ghostEyeImg;
  public static weight: number = 0.8;
  public static speed: number = 0.5;
  public static fps: number = 20;
  public static sprite = {
    width: 361,
    height: 70,
  };
  public static frame = {
    width: 60.16,
    height: 70,
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
      id: GhostEye.id,
      name: GhostEye.name,
      type: GhostEye.type,
      image: GhostEye.image,
      weight: GhostEye.weight,
      speed: GhostEye.speed,
      fps: GhostEye.fps,
      sprite: GhostEye.sprite,
      frame: GhostEye.frame,
      states: GhostEye.states,
    };
  }
}

export default GhostEye;
