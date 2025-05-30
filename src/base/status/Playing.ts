import Enemies from "../../classes/characters/enemies/index.ts";
import Environments from "../../classes/environments/index.ts";
import Boom from "../../classes/vfx/Boom.ts";
import GameStatus from "../../config/GameStatus.ts";
import BaseKeys from "../../enum/BaseKeys.ts";
import IDrawable from "../../interfaces/IDrawable.ts";
import { EnemiesTypesInstance } from "../../types/enemy.ts";
import Interval from "../../utils/Interval.ts";
import { EnvironmentsInstance } from "../../types/environment.ts";
import FloatingMessage from "../../classes/ui/FloatingMessage.ts";
import UI from "../../classes/ui/index.ts";
import { MobileUIInstance, PlayingUIInstance } from "../../types/ui.ts";
import Heroes from "../../classes/characters/heroes/index.ts";
import { CollectableInstance } from "../../types/collectable.ts";
import Collectables from "../../classes/collectables/index.ts";
import { GameStates } from "../../types/game.ts";
import { ControlActions } from "../../types/events.ts";
import Save from "../../handlers/Save.ts";
import { GameSave } from "../../types/save.ts";
import EnvironmentsEnum from "../../enum/Environments.ts";
import HeroesEnum from "../../enum/Heroes.ts";
import { HeroesTypesInstance } from "../../types/hero.ts";

class Playing extends Interval implements IDrawable {
  private level = 1;

  private score = 0;
  private totalScore = 0;

  private prevScorePerLevel = 0;
  private scorePerLevel = 50;

  private speed = 0;
  private maxSpeed = 3;

  private heroLives = 0;

  private highScore = 0;

  private time = 0;
  private maxTime = 5 * 60 * 1000;

  private environments: Environments;
  private currentEnvironment?: EnvironmentsInstance;

  private hero?: HeroesTypesInstance;

  private enemies?: Enemies;
  private activeEnemies: EnemiesTypesInstance[] = [];
  private enemyTimerRef = { timer: 0 };

  private ui: PlayingUIInstance[] = [];
  private mobileUi: MobileUIInstance[] = [];

  private booms: Boom[] = [];
  private floatingMessages: FloatingMessage[] = [];

  private collectables?: Collectables;
  private activeCollectables: CollectableInstance[] = [];
  private collectableTimerRef = { timer: 0 };

  private save: Save | null = null;
  private gameSave: GameSave | null = null;

  private drawingStatus = [
    GameStatus.PLAYING,
    GameStatus.PAUSED,
    GameStatus.OVER,
    GameStatus.TIMES_UP,
    GameStatus.NEXT,
  ];

  public constructor(
    private width: number,
    private height: number,
    private gameStates: GameStates
  ) {
    super();

    this.environments = new Environments(this.height);

    this.init();
  }

  private init() {
    this.save = new Save();
    this.gameSave = this.save.loadGame();

    this.totalScore = this.calcScorePerLevel(
      this.prevScorePerLevel,
      this.level - 1
    );

    this.currentEnvironment = this.environments.getRandomEnvironment();

    this.ui = new UI({
      gameWidth: this.width,
      gameHeight: this.height,
    }).getAllPlayingUIs();

    this.mobileUi = new UI({
      gameWidth: this.width,
      gameHeight: this.height,
    }).getAllMobileUIs({
      y: this.height - 90,
    });

    this.hero = new Heroes(
      this.width,
      this.height,
      this.currentEnvironment.groundMargin,
      this.currentEnvironment.skyMargin,
      this.currentEnvironment.gravity,
      this.speed,
      this.maxSpeed,
      this.score,
      this.gameStates
    ).getRandomHero();

    if (
      this.gameStates.status === GameStatus.NEXT_LEVEL &&
      this.hero.lives < this.heroLives
    )
      this.hero.lives = this.heroLives; // Restore hero lives

    this.enemies = new Enemies(this.width, this.height, {
      enviGroundMargin: this.currentEnvironment.groundMargin,
      enviSkyMargin: this.currentEnvironment.skyMargin,
      heroCord: { x: this.hero.x, y: this.hero.y },
    });

    this.collectables = new Collectables(
      this.width,
      this.height,
      this.currentEnvironment.groundMargin,
      this.currentEnvironment.skyMargin
    );

    this.highScore = this.gameSave?.progress.highScore ?? 0;
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
        interval: (60 * 1000) / this.level,
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
        interval: 1000 / this.level,
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
    controlActions,
  }: {
    deltaTime: number;
    keys: BaseKeys[];
    controlActions: ControlActions;
  }): void {
    if (this.gameStates.status === GameStatus.NEXT_LEVEL) this.nextLevelStart();

    if (this.gameStates.status === GameStatus.RESTART) this.restart();

    if (
      this.gameStates.status === GameStatus.RESTART_LEVEL ||
      this.gameStates.status === GameStatus.CONTINUE
    )
      this.restartLevel();

    // save game progress if level is won
    if (this.isLevelWin()) {
      this.updateGameSave();
      this.gameStates.status = GameStatus.NEXT;
    }

    if (this.isTimesUp()) this.gameStates.status = GameStatus.TIMES_UP;

    if (this.gameStates.status !== GameStatus.PLAYING) return;

    this.time += deltaTime;

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
    this.score = this.hero?.score ?? this.score;

    // somthing wrong here

    if (this.totalScore + this.score > this.highScore) {
      this.highScore = this.totalScore + this.score;
    }

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
        score: this.score,
        highScore: this.highScore,
        keys,
        scorePerLevel: this.scorePerLevel,
        gameStates: this.gameStates,
        level: this.level,
        time: this.time,
        timeLimit: this.maxTime,
        controlActions,
        hero: {
          energy: this.hero?.energy ?? 0,
          lives: this.hero?.lives ?? 0,
        },
      })
    );

    // update mobile UI
    this.mobileUi.forEach((ui) =>
      ui.update({
        controlActions,
        keys,
      })
    );

    // update collectable
    this.addCollectable(deltaTime);
    this.destroyCollectable(deltaTime);
  }

  public draw(ctx: CanvasRenderingContext2D, debugMode: boolean): void {
    if (!this.isKeepDrawing()) return;

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

    // draw mobile UI
    this.mobileUi.forEach((ui) => ui.draw(ctx));

    // draw collectable
    this.activeCollectables.forEach((collectable) => collectable.draw(ctx));
  }

  private isKeepDrawing() {
    return this.drawingStatus.some(
      (status) => status === this.gameStates.status
    );
  }

  private loadGameSave() {
    if (!this.gameSave) return this.restart();

    this.level = this.gameSave.progress.level += 1;
    this.heroLives = this.gameSave.progress.lives;

    this.currentEnvironment = this.environments.getEnvironmentByName(
      this.gameSave.environment.name
    );

    this.hero = new Heroes(
      this.width,
      this.height,
      this.currentEnvironment.groundMargin,
      this.currentEnvironment.skyMargin,
      this.currentEnvironment.gravity,
      this.speed,
      this.maxSpeed,
      this.score,
      this.gameStates
    ).getHeroByName(this.gameSave.hero.name);
  }

  private clearLevelStates = () => {
    this.score = 0;
    this.time = 0;
    this.speed = 0;
    this.activeEnemies = [];
    this.floatingMessages = [];
  };

  private restart(): void {
    this.level = 1;
    this.restartLevel();
  }

  private updateGameSave() {
    if (!this.save) return;

    if (
      this.gameSave?.progress.lives === this.heroLives &&
      this.gameSave?.progress.highScore === this.highScore &&
      this.gameSave.environment.name === this.currentEnvironment?.uniqueName &&
      this.gameSave.hero.name === this.hero?.uniqueName
    )
      return;

    this.save.saveGame({
      progress: {
        level: this.level,
        lives: this.heroLives,
        highScore: this.highScore,
      },
      environment: {
        name: this.currentEnvironment?.uniqueName ?? EnvironmentsEnum.FOREST,
      },
      hero: {
        name: this.hero?.uniqueName ?? HeroesEnum.SHADOW_DOG,
      },
    });

    this.gameSave = this.save.loadGame();
  }

  private restartLevel(): void {
    this.clearLevelStates();
    this.init();
    if (this.gameStates.status === GameStatus.CONTINUE) this.loadGameSave();
    this.gameStates.status = GameStatus.PLAYING;
  }

  private calcScorePerLevel(initialScore: number, level: number): number {
    if (level === 0) return 0;
    let score = initialScore;
    for (let i = 1; i <= level; i++) {
      score += Math.ceil(score * 0.1);
    }
    return score;
  }

  private calcMaxTime(initialTime: number, level: number): number {
    if (level === 0) return 0;

    let score = initialTime;
    for (let i = 1; i <= level; i++) {
      score -= Math.ceil(score * 0.015);
    }
    return score;
  }

  private nextLevelStart(): void {
    this.level++;
    this.maxTime = this.calcMaxTime(this.maxTime, this.level);
    this.prevScorePerLevel = this.scorePerLevel;
    this.scorePerLevel = this.calcScorePerLevel(this.scorePerLevel, this.level);
    this.restartLevel();
  }

  private isLevelWin(): boolean {
    return (
      this.score >= this.scorePerLevel &&
      this.gameStates.status !== GameStatus.MENU
    );
  }

  private isTimesUp(): boolean {
    return (
      this.time > this.maxTime && this.gameStates.status !== GameStatus.MENU
    );
  }
}

export default Playing;
