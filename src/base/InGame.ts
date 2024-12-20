import Enemies from "../classes/characters/enemies";
import Hero from "../classes/characters/heroes/Hero";
import Environments from "../classes/environments";
import Boom from "../classes/vfx/Boom";
import GameStatus from "../config/GameStatus";
import BaseKeys from "../enum/BaseKeys";
import IDrawable from "../interfaces/IDrawable";
import { EnemiesTypesInstance } from "../types/enemy";
import Interval from "../utils/Interval";
import { EnvironmentsInstance } from "../types/environment";
import FloatingMessage from "../classes/ui/FloatingMessage.ts";
import InGameUIs from "../classes/ui/index.ts";
import { InGameUIInstance } from "../types/ui.ts";
import Heroes from "../classes/characters/heroes";
import { CollectableInstance } from "../types/collectable.ts";
import Collectables from "../classes/collectables/index.ts";

class InGame extends Interval implements IDrawable {
  private level = 1;

  private score = 0;

  private speed = 0;
  private maxSpeed = 3;

  //private highScore = 0;

  private time = 0;
  private maxTime = 5 * 60 * 60 * 1000;

  private environments: Environments;
  private currentEnvironment?: EnvironmentsInstance;

  private hero?: Hero;

  private enemies?: Enemies;
  private activeEnemies: EnemiesTypesInstance[] = [];
  private enemyTimerRef = { timer: 0 };

  private ui: InGameUIInstance[] = [];

  private booms: Boom[] = [];
  private floatingMessages: FloatingMessage[] = [];

  private collectables?: Collectables;
  private activeCollectables: CollectableInstance[] = [];
  private collectableTimerRef = { timer: 0 };

  public constructor(
    private width: number,
    private height: number,
    public gameStatus: GameStatus
  ) {
    super();
    this.environments = new Environments(this.height);

    this.init();
  }

  private init() {
    this.currentEnvironment = this.environments.getRandomEnvironment();

    this.ui = new InGameUIs({
      gameWidth: this.width,
      timeLimit: this.maxTime,
    }).getAllInGameUIs();

    this.hero = new Heroes(
      this.width,
      this.height,
      this.currentEnvironment.groundMargin,
      this.currentEnvironment.gravity,
      this.speed,
      this.maxSpeed,
      this.score,
      this.gameStatus
    ).getRandomHero();

    this.enemies = new Enemies(this.width, this.height, {
      enviGroundMargin: this.currentEnvironment.groundMargin,
      heroCord: { x: this.hero.x, y: this.hero.y },
    });

    this.collectables = new Collectables(
      this.width,
      this.height,
      this.currentEnvironment.groundMargin
    );
  }

  // collectable handling
  private addCollectable(deltaTime: number) {
    this.runConstInterval(
      () =>
        this.activeCollectables.push(
          this.collectables?.getRandomCollectable()!
        ),
      deltaTime,
      this.collectableTimerRef,
      {
        interval: 60 * 1000,
      }
    );
  }

  private destroyCollectable(deltaTime: number) {
    this.activeCollectables.forEach((collectable) => {
      collectable.update({
        deltaTime,
        gameSpeed: this.speed,
      });
      if (collectable.markForDelete)
        this.activeCollectables = this.activeCollectables.filter(
          (activeCollectable) => activeCollectable !== collectable
        );
    });
  }

  // enemy handling
  private addEnemy(deltaTime: number) {
    this.runConstInterval(
      () => this.activeEnemies.push(this.enemies?.getRandomEnemy(this.speed)!),
      deltaTime,
      this.enemyTimerRef,
      {
        interval: this.level * 1000,
      }
    );
  }
  private destroyEnemy(deltaTime: number) {
    this.activeEnemies.forEach((enemy) => {
      enemy.update({
        deltaTime,
        gameSpeed: this.speed,
        heroCords: { x: this.hero?.x ?? 0, y: this.hero?.y ?? 0 },
      });
      if (enemy.markForDelete)
        this.activeEnemies = this.activeEnemies.filter(
          (activeEnemy) => activeEnemy !== enemy
        );
    });
  }

  public update({
    deltaTime,
    keys,
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
    this.currentEnvironment?.update({ gameSpeed: this.speed });

    // hero update
    this.hero?.update({
      deltaTime,
      keys,
      enemies: this.activeEnemies,
      booms: this.booms,
      floatingMessages: this.floatingMessages,
      collectables: this.activeCollectables,
    });
    this.speed = this.hero?.gameSpeed ?? this.speed;
    this.gameStatus = this.hero?.gameStatus ?? this.gameStatus;
    this.score = this.hero?.score ?? this.score;

    // enemy update
    this.addEnemy(deltaTime);
    this.destroyEnemy(deltaTime);

    // update boom effect
    this.booms.forEach((boom) =>
      boom.update({ deltaTime, gameSpeed: this.speed })
    );
    this.booms = this.booms.filter((boom) => !boom.markForDelete);

    // update the floating messages
    this.floatingMessages.forEach((message) =>
      message.update({ deltaTime, gameSpeed: this.speed })
    );
    this.floatingMessages = this.floatingMessages.filter(
      (message) => !message.markForDelete
    );

    // update UI
    this.ui.forEach((ui) =>
      ui.update({
        deltaTime,
        score: this.score,
        hero: {
          energy: this.hero?.energy ?? 0,
          lives: this.hero?.lives ?? 0,
        },
      })
    );

    // update collectable
    this.addCollectable(deltaTime);
    this.destroyCollectable(deltaTime);
  }

  public draw(ctx: CanvasRenderingContext2D, debugMode: boolean): void {
    if (this.gameStatus !== GameStatus.PLAYING) return;

    // draw environment
    this.currentEnvironment?.draw(ctx);

    // draw hero
    this.hero?.draw(ctx, debugMode);

    // draw boom effect
    this.booms.forEach((boom) => boom.draw(ctx));

    // draw floating messages
    this.floatingMessages.forEach((message) => message.draw(ctx));

    // draw enemies
    this.activeEnemies.forEach((enemy) => enemy.draw(ctx, debugMode));

    // draw UI
    this.ui.forEach((ui) => ui.draw(ctx));

    // draw collectable
    this.activeCollectables.forEach((collectable) => collectable.draw(ctx));
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
    this.activeEnemies = [];
    this.floatingMessages = [];
    this.gameStatus = GameStatus.PLAYING;
    this.init();
  }
}

export default InGame;
