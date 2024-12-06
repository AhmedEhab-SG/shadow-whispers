import { EnemyObj, state } from "../../../types/enemy";
import EnemyStates from "../../../enum/EnemyStates";
import ghostEyeImg from "../../../assets/sprite/enemies/ghost_eye.png";
import Enemies, { EnemiesTypes } from "../../../enum/Enemies";

class GhostEye {
  static id: number = 7;
  static name: Enemies = Enemies.GHOST_EYE;
  static type: EnemiesTypes = EnemiesTypes.FLYING;
  static image: string = ghostEyeImg;
  static weight: number = 0.8;
  static speed: number = 0.5;
  static fps: number = 20;
  static sprite = {
    width: 361,
    height: 70,
  };
  static frame = {
    width: 60.16,
    height: 70,
  };
  static states: state[] = [
    {
      key: EnemyStates.ENGAGE,
      name: "ENGAGE",
      frameY: 0,
      maxFramesX: 5,
    },
  ];

  static get enemyObj(): EnemyObj {
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
