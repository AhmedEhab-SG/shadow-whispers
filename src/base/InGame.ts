import Enemies from "../classes/characters/enemies";
import Hero from "../classes/characters/heroes/Hero";
import Environment from "../classes/environments/Environment";
import Boom from "../classes/vfx/Boom";
import GameStatus from "../config/GameStatus";
import ShadowDog from "../constants/characters/heros/ShadowDog";
import City from "../constants/environments/City";
import BaseKeys from "../enum/BaseKeys";
import IDrawable from "../interfaces/IDrawable";
import { EnemiesTypesInstance } from "../types/enemy";
import Interval from "../utils/Interval";

class InGame extends Interval implements IDrawable {
  private speed = 0;
  private maxSpeed = 3;

  private score = 0;
  //private highScore = 0;

  private time = 0;
  private maxTime = 5 * 60 * 60 * 1000;

  private environment?: Environment;
  private hero?: Hero;
  private enemies?: Enemies;

  private activeEnemies: EnemiesTypesInstance[] = [];
  private enemyTimerRef = { timer: 0 };

  private booms: Boom[] = [];

  constructor(
    private width: number,
    private height: number,
    public gameStatus: GameStatus
  ) {
    super();
    this.init();
  }

  private init() {
    this.environment = new Environment(City.environmentObj, this.height);

    this.hero = new Hero(
      ShadowDog.heroObj,
      this.width,
      this.height,
      this.environment.groundMargin,
      this.environment.gravity,
      this.speed,
      this.maxSpeed,
      this.gameStatus,
      this.score
    );

    this.enemies = new Enemies(this.width, this.height, {
      enviGroundMargin: this.environment.groundMargin,
      heroCord: { x: this.hero.x, y: this.hero.y },
    });
  }

  // enemy handling
  private addEnemy(deltaTime: number) {
    this.runConstInterval(
      () => this.activeEnemies.push(this.enemies?.getRandomEnemy(this.speed)!),
      deltaTime,
      this.enemyTimerRef
    );
  }
  private destroyEnemy(enemy: EnemiesTypesInstance) {
    this.activeEnemies = this.activeEnemies.filter(
      (activeEnemy) => activeEnemy !== enemy
    );
  }

  update({
    deltaTime,
    keys,
    cords,
  }: {
    deltaTime: number;
    keys: BaseKeys[];
    cords: { x: number; y: number };
  }): void {
    if (this.gameStatus === GameStatus.OVER) this.restart();
    if (this.gameStatus !== GameStatus.PLAYING) return;

    // timer game over
    if (this.isTimesUp(deltaTime)) return;

    // environment update
    this.environment?.update({ gameSpeed: this.speed });

    // hero update
    this.hero?.update({
      deltaTime,
      keys,
      enemies: this.activeEnemies,
      booms: this.booms,
    });
    this.speed = this.hero?.gameSpeed ?? this.speed;
    this.gameStatus = this.hero?.gameStatus ?? this.gameStatus;
    this.score = this.hero?.score ?? this.score;

    // enemy update
    this.addEnemy(deltaTime);
    this.activeEnemies.forEach((enemy) => {
      enemy.update({
        deltaTime,
        gameSpeed: this.speed,
        heroCords: { x: this.hero?.x ?? 0, y: this.hero?.y ?? 0 },
      });
      if (enemy.markForDelete) this.destroyEnemy(enemy);
    });

    // update boom effect
    this.booms.forEach((boom) =>
      boom.update({ deltaTime, gameSpeed: this.speed })
    );
    this.booms = this.booms.filter((boom) => !boom.markForDelete);
  }

  draw(ctx: CanvasRenderingContext2D, debugMode: boolean): void {
    if (this.gameStatus !== GameStatus.PLAYING) return;

    // draw environment
    this.environment?.draw(ctx);

    // draw hero
    this.hero?.draw(ctx, debugMode);

    // draw boom effect
    this.booms.forEach((boom) => boom.draw(ctx));

    // draw enemies
    this.activeEnemies.forEach((enemy) => enemy.draw(ctx, debugMode));
  }

  private isTimesUp(deltaTime: number): boolean {
    this.time += deltaTime;
    if (this.time >= this.maxTime) {
      this.gameStatus = GameStatus.TIMES_UP;
      return true;
    }
    return false;
  }

  private restart(): void {
    this.score = 0;
    this.time = 0;
    this.speed = 0;
    this.gameStatus = GameStatus.PLAYING;
    this.activeEnemies = [];
    this.init();
  }
}

export default InGame;
