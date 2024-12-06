import { EnemyObj, state } from "../../../types/enemy";
import EnemyStates from "../../../enum/EnemyStates";
import handImg from "../../../assets/sprite/enemies/hand.png";
import Enemies, { EnemiesTypes } from "../../../enum/Enemies";

class Hand {
  static id: number = 10;
  static name: Enemies = Enemies.HAND;
  static type: EnemiesTypes = EnemiesTypes.GROUND_STATIC;
  static image: string = handImg;
  static weight: number = 0.8;
  static speed: number = 0.5;
  static fps: number = 20;
  static sprite = {
    width: 446,
    height: 80,
  };
  static frame = {
    width: 55.75,
    height: 80,
  };
  static states: state[] = [
    {
      key: EnemyStates.ENGAGE,
      name: "ENGAGE",
      frameY: 0,
      maxFramesX: 7,
    },
  ];

  static get enemyObj(): EnemyObj {
    return {
      id: Hand.id,
      name: Hand.name,
      type: Hand.type,
      image: Hand.image,
      weight: Hand.weight,
      speed: Hand.speed,
      fps: Hand.fps,
      sprite: Hand.sprite,
      frame: Hand.frame,
      states: Hand.states,
    };
  }
}

export default Hand;
