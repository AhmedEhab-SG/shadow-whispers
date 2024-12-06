import { EnemyObj, state } from "../../../types/enemy";
import EnemyStates from "../../../enum/EnemyStates";
import spiderImg from "../../../assets/sprite/enemies/spider.png";
import Enemies, { EnemiesTypes } from "../../../enum/Enemies";

class Spider {
  static id: number = 14;
  static name: Enemies = Enemies.SPIDER;
  static type: EnemiesTypes = EnemiesTypes.CLIMBING;
  static image: string = spiderImg;
  static weight: number = 0.8;
  static speed: number = 0.5;
  static fps: number = 20;
  static sprite = {
    width: 1860,
    height: 175,
  };
  static frame = {
    width: 310,
    height: 175,
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
