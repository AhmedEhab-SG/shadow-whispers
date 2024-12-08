import { EnemyObj, state } from "../../../types/enemy";
import EnemyStates from "../../../enum/EnemyStates";
import spiderImg from "../../../assets/sprite/enemies/spider.png";
import Enemies, { EnemiesTypes } from "../../../enum/Enemies";

class Spider {
  public static id: number = 14;
  public static name: Enemies = Enemies.SPIDER;
  public static type: EnemiesTypes = EnemiesTypes.CLIMBING;
  public static image: string = spiderImg;
  public static weight: number = 0.8;
  public static speed: number = 0.5;
  public static fps: number = 20;
  public static sprite = {
    width: 1860,
    height: 175,
  };
  public static frame = {
    width: 310,
    height: 175,
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
      id: Spider.id,
      name: Spider.name,
      type: Spider.type,
      image: Spider.image,
      weight: Spider.weight,
      speed: Spider.speed,
      fps: Spider.fps,
      sprite: Spider.sprite,
      frame: Spider.frame,
      states: Spider.states,
    };
  }
}

export default Spider;
