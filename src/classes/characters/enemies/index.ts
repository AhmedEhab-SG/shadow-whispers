import { EnemiesTypesInstance } from "../../../types/enemy";
import EnemiesEnum, { EnemiesTypes } from "../../../enum/Enemies";
import Spider from "./enemiesTypes/Spider";
import SpiderBig from "./enemiesTypes/SpiderBig";
import Zombie from "./enemiesTypes/Zombie";
import Bat from "./enemiesTypes/Bat";
import Hand from "./enemiesTypes/Hand";
import BatCrazy from "./enemiesTypes/BatCrazy";
import Bird from "./enemiesTypes/Bird";
import Digger from "./enemiesTypes/Digger";
import Fly from "./enemiesTypes/Fly";
import Ghost from "./enemiesTypes/Ghost";
import GhostEye from "./enemiesTypes/GhostEye";
import GhostFast from "./enemiesTypes/GhostFast";
import GhostGloomy from "./enemiesTypes/GhostGloomy";
import Plant from "./enemiesTypes/Plant";
import Raven from "./enemiesTypes/Raven";
import Spinner from "./enemiesTypes/Spinner";
import ZombieGround from "./enemiesTypes/ZombieGround";

class Enemies {
  private static readonly FlyingEnemies = [
    Bat,
    BatCrazy,
    Bird,
    Fly,
    Ghost,
    GhostEye,
    GhostFast,
    GhostGloomy,
    Raven,
    Spinner,
  ];
  private static readonly GroundStaticEnemies = [
    Hand,
    Digger,
    Plant,
    ZombieGround,
  ];
  private static readonly ClimbingEnemies = [Spider, SpiderBig];
  private static readonly GroundEnemies = [Zombie];

  public static readonly EnemiesTypes = [
    ...this.FlyingEnemies,
    ...this.GroundStaticEnemies,
    ...this.ClimbingEnemies,
    ...this.GroundEnemies,
  ];

  protected enviGroundMargin: number;
  protected heroCord: { x: number; y: number };

  public constructor(
    protected gameWidth: number,
    protected gameHeight: number,
    {
      enviGroundMargin,
      heroCord,
    }: {
      enviGroundMargin: number;
      heroCord: { x: number; y: number };
    }
  ) {
    this.enviGroundMargin = enviGroundMargin;
    this.heroCord = heroCord;
  }

  public getEnemyByName(uniqueName: EnemiesEnum): EnemiesTypesInstance {
    return new (Enemies.EnemiesTypes.find(
      (enemy) => enemy.uniqueName === uniqueName
    )!)(this.gameWidth, this.gameHeight, {
      enviGroundMargin: this.enviGroundMargin,
      heroCord: this.heroCord,
    });
  }

  public getEnemiesByType(type: EnemiesTypes): EnemiesTypesInstance[] {
    return Enemies.EnemiesTypes.filter((enemy) => enemy.type === type)!.map(
      (enemy) =>
        new enemy(this.gameWidth, this.gameHeight, {
          enviGroundMargin: this.enviGroundMargin,
          heroCord: this.heroCord,
        })
    );
  }

  public getRandomEnemy(gameSpeed: number): EnemiesTypesInstance {
    const ClassesNotGroundStatic = Enemies.EnemiesTypes.filter(
      (enemy) => enemy.type !== EnemiesTypes.GROUND_STATIC
    );

    const RandomCLasses = new Enemies.EnemiesTypes[
      Math.floor(Math.random() * Enemies.EnemiesTypes.length)
    ]!(this.gameWidth, this.gameHeight, {
      enviGroundMargin: this.enviGroundMargin,
      heroCord: this.heroCord,
    });

    const RandomClassesNotGroundStatic = new ClassesNotGroundStatic[
      Math.floor(Math.random() * ClassesNotGroundStatic.length)
    ]!(this.gameWidth, this.gameHeight, {
      enviGroundMargin: this.enviGroundMargin,
      heroCord: this.heroCord,
    });

    return gameSpeed ? RandomCLasses : RandomClassesNotGroundStatic;
  }

  public get enemies(): EnemiesTypesInstance[] {
    return Enemies.EnemiesTypes.map(
      (enemy) =>
        new enemy(this.gameWidth, this.gameHeight, {
          enviGroundMargin: this.enviGroundMargin,
          heroCord: this.heroCord,
        })
    );
  }
}

export default Enemies;
