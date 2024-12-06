import { EnemyObj, state } from "../../../types/enemy";
import EnemyStates from "../../../enum/EnemyStates";
import ghostFastImg from "../../../assets/sprite/enemies/ghost_fast.png";
import Enemies, { EnemiesTypes } from "../../../enum/Enemies";

class GhostFast {
  static id: number = 8;
  static name: Enemies = Enemies.GHOST_FAST;
  static type: EnemiesTypes = EnemiesTypes.FLYING;
  static image: string = ghostFastImg;
  static weight: number = 0.8;
  static speed: number = 0.5;
  static fps: number = 20;
  static sprite = {
    width: 524,
    height: 70,
  };
  static frame = {
    width: 87.33,
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
      id: GhostFast.id,
      name: GhostFast.name,
      type: GhostFast.type,
      image: GhostFast.image,
      weight: GhostFast.weight,
      speed: GhostFast.speed,
      fps: GhostFast.fps,
      sprite: GhostFast.sprite,
      frame: GhostFast.frame,
      states: GhostFast.states,
    };
  }
}

export default GhostFast;
