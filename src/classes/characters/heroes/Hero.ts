import GameStatus from "../../../config/GameStatus";
import BaseKeys from "../../../enum/BaseKeys";
import HeroStatesEnum from "../../../enum/HeroStates";
import HeroStates from "../../../handlers/states/heroStates";
import { HeroObj, HeroStateInstance } from "../../../types/hero";
import Boom from "../../vfx/Boom";
import Particle from "../../vfx/particles/Particle";
import Character from "../Character";
import Enemy from "../enemies/Enemy";
import EnemiesCollision from "./collisions/EnemyCollision";

class Hero extends Character {
  private _lives = 0;
  private _energy = 0;
  private maxEnergy = 0;

  private heroStates?: HeroStates;
  private _currentState?: HeroStateInstance;

  private energyRef = { timer: 0 };

  private _particles: Particle[] = [];

  constructor(
    private heroObj: HeroObj,
    private gameWidth: number,
    private gameHeight: number,
    private enviGroundMargin: number,
    private enviGravity: number,
    private _gameSpeed: number,
    private maxGameSpeed: number,
    public gameStatus: GameStatus,
    private _score: number
  ) {
    super();
    this.init();
  }

  private init(): void {
    this.loadImage(this.heroObj.image);

    this.sizeScale = 0.45;
    this.width = this.heroObj.frame.width;
    this.height = this.heroObj.frame.width;

    this.y = this.gameHeight - this.height - this.enviGroundMargin;

    this._lives = this.heroObj.lives;
    this._energy = this.heroObj.energy;
    this.maxEnergy = this.heroObj.energy;

    // create hero states and init
    this.heroStates = new HeroStates(this, this.heroObj, {
      gameHeight: this.gameHeight,
      enviGroundMargin: this.enviGroundMargin,
      enviGravity: this.enviGravity,
    });
    this.setState(HeroStatesEnum.IDLE, 0);
  }

  private horizontalMovement(input: BaseKeys[]) {
    this.x += this.vx; // velocity x

    if (input.includes(BaseKeys.RIGHT) && !input.includes(BaseKeys.LEFT)) {
      this.vx = this.heroObj.speed;
      this.reverseImg = false;
      if (this.x > (this.gameWidth - this.width) * 0.6) this.vx = 0;
    } else if (
      input.includes(BaseKeys.LEFT) &&
      !input.includes(BaseKeys.RIGHT)
    ) {
      this.reverseImg = true;
      this.vx = -this.heroObj.speed * 2.5;

      if (
        this._currentState ===
        this.heroStates?.getState(HeroStatesEnum.ROLL_LEFT)
      )
        this.vx = -this.heroObj.speed - this.maxGameSpeed * 1.5;
    } else {
      this.vx = 0;
      this._gameSpeed = 0;
    }
  }

  private verticalMovement() {
    this.y += this.vy * this.enviGravity; // apply velocity

    if (!this.isOnGround()) this.vy += this.heroObj.weight * this.enviGravity;
    else this.vy = 0;
    // apply gravity

    // vertical boundary check
    if (this.y > this.gameHeight - this.height - this.enviGroundMargin)
      this.y = this.gameHeight - this.height - this.enviGroundMargin;
  }

  private boundaries(): void {
    // horizontal boundary check
    if (this.x < 0) this.x = 0;
    if (this.x > this.gameWidth - this.width)
      this.x = this.gameWidth - this.width;

    // vertical boundary check
    if (this.y > this.gameHeight - this.height - this.enviGroundMargin)
      this.y = this.gameHeight - this.height - this.enviGroundMargin;
  }

  public setState(state: HeroStatesEnum, gameSpeedMod: number): void {
    this._currentState?.exit();

    // if energy is less than 0, dont roll
    if (
      this._energy <= 0 &&
      (state === HeroStatesEnum.ROLL_RIGHT ||
        state === HeroStatesEnum.ROLL_LEFT)
    )
      return;

    this._currentState = this.heroStates?.getState(state);

    // hanlde the speed of the game
    this._gameSpeed = this.maxGameSpeed * gameSpeedMod;

    this._currentState?.enter();
  }

  private energyHandler(deltaTime: number) {
    this.runConstInterval(
      () => {
        if (
          this._currentState !==
            this.heroStates?.getState(HeroStatesEnum.ROLL_RIGHT) &&
          this._currentState !==
            this.heroStates?.getState(HeroStatesEnum.ROLL_LEFT) &&
          this._energy < this.maxEnergy
        ) {
          if (
            this._currentState === this.heroStates?.getState(HeroStatesEnum.SIT)
          )
            this._energy += 15;
          else this._energy += 5;
          if (this._energy > this.maxEnergy) this._energy = this.maxEnergy;
        }
      },
      deltaTime,
      this.energyRef
    );

    if (this._energy < 0) this._energy = 0;
  }

  public isOnGround() {
    return this.y === this.gameHeight - this.height - this.enviGroundMargin;
  }

  public update({
    deltaTime,
    keys,
    enemies,
    booms,
  }: {
    deltaTime: number;
    keys: BaseKeys[];
    enemies: Enemy[];
    booms: Boom[];
  }): void {
    // update with constant time
    this.animateCharacter(deltaTime, this.heroObj.fps);

    // handle input
    this._currentState?.keysHandler(keys);

    // handle horizontal movement
    this.horizontalMovement(keys);

    // handle vertical movement
    this.verticalMovement();

    //boundaries
    this.boundaries();

    // handle energy
    this.energyHandler(deltaTime);

    // enemy collision

    EnemiesCollision.checkCollision(this, enemies, booms, this._score);
    this._score = EnemiesCollision.score;

    // update the particles
    this._particles.forEach((particle) =>
      particle.update({ gameSpeed: this._gameSpeed })
    );
    this._particles = this._particles.filter(
      (particle) => !particle.markDelete
    );
  }

  public draw(ctx: CanvasRenderingContext2D, debugMode: boolean): void {
    if (!this.imgLoaded) return;

    if (debugMode)
      this.debug(ctx, this.x, this.y, this.width, this.height, {
        color: "lightgreen",
      });

    // draw particles
    this._particles.forEach((particle) => particle.draw(ctx));

    ctx.save();
    if (this.reverseImg) ctx.scale(-1, 1); // Flip the image horizontallyd

    ctx.drawImage(
      this.image,
      this.frameX * this.heroObj.frame.width,
      this.frameY * this.heroObj.frame.height,
      this.heroObj.frame.width,
      this.heroObj.frame.height,
      this.reverseImg ? -this.x - this.width : this.x,
      this.y,
      this.width,
      this.height
    );
    ctx.restore();
  }

  // Getters and Setters
  public get gameSpeed(): number {
    return this._gameSpeed;
  }

  public get lives(): number {
    return this._lives;
  }

  public set lives(lives: number) {
    this._lives = lives;
  }

  public get energy(): number {
    return this._energy;
  }

  public set energy(energy: number) {
    this._energy = energy;
  }

  public get currentState(): HeroStateInstance | undefined {
    return this._currentState;
  }

  public get score(): number {
    return this._score;
  }

  public get particles(): Particle[] {
    return this._particles;
  }
}

export default Hero;
