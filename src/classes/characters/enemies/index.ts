import { EnemiesTypesInstance } from "../../../types/enemy";
import EnemiesEnum, { EnemiesTypes } from "../../../enum/Enemies";
import Spider from "./enemiesTypes/Spider";
import SpiderBig from "./enemiesTypes/SpiderBig";
import Zombie from "./enemiesTypes/Zombie";
import Bat from "./enemiesTypes/Bat";
import Hand from "./enemiesTypes/Hand";
import BatCrazy from "./enemiesTypes/BatCrazy";

// const FlyingEnemies = [
//   //   Bird,
//   //   Bat,
//   //   BatCrazy,
//   //   Fly,
//   //   Spinner,
//   //   Ghost,
//   //   GhostEye,
//   //   GhostFast,
//   //   GhostGloomy,
//   //   Raven,
// ];

// const ClimbingEnemies = [
//   Spider,
//   // SpiderBig
// ];

// const GroundEnemies = [
//   // Digger, Hand, Plant, Snail, Zombie, ZombieGround
// ];

class Enemies {
  private static readonly FlyingEnemies = [Bat, BatCrazy];
  private static readonly GroundEnemies = [Zombie];
  private static readonly GroundStaticEnemies = [Hand];
  private static readonly ClimbingEnemies = [Spider, SpiderBig];

  public static readonly EnemiesTypes = [
    ...this.FlyingEnemies,
    ...this.ClimbingEnemies,
    ...this.GroundStaticEnemies,
    ...this.GroundEnemies,
  ];

  protected enviGroundMargin: number;
  protected heroCord: { x: number; y: number };

  constructor(
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
