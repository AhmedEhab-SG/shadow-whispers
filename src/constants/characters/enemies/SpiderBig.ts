import { EnemyObj, state } from "../../../types/enemy";
import EnemyStates from "../../../enum/EnemyStates";
import spiderBigImg from "../../../assets/sprite/enemies/spider_big.png";
import Enemies, { EnemiesTypes } from "../../../enum/Enemies";

class SpiderBig {
  static id: number = 15;
  static name: Enemies = Enemies.SPIDER_BIG;
  static type: EnemiesTypes = EnemiesTypes.CLIMBING;
  static image: string = spiderBigImg;
  static weight: number = 0.8;
  static speed: number = 0.5;
  static fps: number = 20;
  static sprite = {
    width: 720,
    height: 144,
  };
  static frame = {
    width: 120,
    height: 144,
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
      id: SpiderBig.id,
      name: SpiderBig.name,
      type: SpiderBig.type,
      image: SpiderBig.image,
      weight: SpiderBig.weight,
      speed: SpiderBig.speed,
      fps: SpiderBig.fps,
      sprite: SpiderBig.sprite,
      frame: SpiderBig.frame,
      states: SpiderBig.states,
    };
  }
}

export default SpiderBig;
