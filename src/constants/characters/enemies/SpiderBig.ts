import { EnemyObj, state } from "../../../types/enemy";
import EnemyStates from "../../../enum/EnemyStates";
import spiderBigImg from "../../../assets/sprite/enemies/spider_big.png";
import Enemies, { EnemiesTypes } from "../../../enum/Enemies";

class SpiderBig {
  public static id: number = 15;
  public static name: Enemies = Enemies.SPIDER_BIG;
  public static type: EnemiesTypes = EnemiesTypes.CLIMBING;
  public static image: string = spiderBigImg;
  public static weight: number = 0.8;
  public static speed: number = 0.5;
  public static fps: number = 20;
  public static sprite = {
    width: 720,
    height: 144,
  };
  public static frame = {
    width: 120,
    height: 144,
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
