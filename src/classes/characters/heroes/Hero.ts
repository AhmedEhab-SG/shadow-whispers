import BaseKeys from "../../../enum/BaseKeys";
import HeroStatesEnum from "../../../enum/HeroStates";
import HeroStates from "../../../handlers/states/heroStates";
import { GameStates } from "../../../types/game";
import { HeroObj, HeroStateInstance } from "../../../types/hero";
import Collectable from "../../collectables/Collectable";
import FloatingMessage from "../../ui/FloatingMessage";
import Boom from "../../vfx/Boom";
import Particle from "../../vfx/particles/Particle";
import Character from "../Character";
import Enemy from "../enemies/Enemy";
import CollectableCollision from "./collisions/CollectableCollision";
import EnemiesCollision from "./collisions/EnemyCollision";

abstract class Hero extends Character {
  private _lives = 0;
  private _energy = 0;
  private _maxEnergy = 0;

  private _heroStates?: HeroStates;
  private _currentState?: HeroStateInstance;

  private energyRef = { timer: 0 };

  private _particles: Particle[] = [];

  protected constructor(
    protected heroObj: HeroObj,
    protected gameWidth: number,
    protected gameHeight: number,
    protected enviGroundMargin: number,
    protected enviSkyMargin: number,
    protected enviGravity: number,
    protected _gameSpeed: number,
    protected maxGameSpeed: number,
    protected _score: number,
    public gameStates: GameStates
  ) {
    super();

    this.loadImage(this.heroObj.image);

    this.sizeScale = 0.45;
    this.width = this.heroObj.frame.width;
    this.height = this.heroObj.frame.width;

    this.y = this.gameHeight - this.height - this.enviGroundMargin;

    this._lives = this.heroObj.lives;
    this._energy = this.heroObj.energy;
    this._maxEnergy = this.heroObj.energy;

    // create hero states and init
    this._heroStates = new HeroStates(this, this.heroObj, {
      gameHeight: this.gameHeight,
      enviGroundMargin: this.enviGroundMargin,
      enviSkyMargin: this.enviSkyMargin,
      enviGravity: this.enviGravity,
    });
    this.setState(HeroStatesEnum.IDLE, 0);
  }

  protected horizontalMovement(input: BaseKeys[]) {
    this.x += this.vx; // velocity x

    if (input.includes(BaseKeys.RIGHT) && !input.includes(BaseKeys.LEFT)) {
      this.vx = this.heroObj.speed;
      this.reverseImg = false;
      if (this.x > (this.gameWidth - this.width) * 0.5) this.vx = 0;
    } else if (
      input.includes(BaseKeys.LEFT) &&
      !input.includes(BaseKeys.RIGHT)
    ) {
      this.reverseImg = true;
      this.vx = -this.heroObj.speed * 2.5;

      if (
        this._currentState ===
        this._heroStates?.getState(HeroStatesEnum.ROLL_LEFT)
      )
        this.vx = -this.heroObj.speed - this.maxGameSpeed * 1.5;
    } else {
      this.vx = 0;
      this._gameSpeed = 0;
    }
  }

  protected verticalMovement() {
    this.y += this.vy * this.enviGravity; // apply velocity

    if (!this.isOnGround()) this.vy += this.heroObj.weight * this.enviGravity;
    else this.vy = 0;
    // apply gravity

    // vertical boundary check
    if (this.y > this.gameHeight - this.height - this.enviGroundMargin)
      this.y = this.gameHeight - this.height - this.enviGroundMargin;
  }

  protected boundaries(): void {
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

    this._currentState = this._heroStates?.getState(state);

    // hanlde the speed of the game
    this._gameSpeed = this.maxGameSpeed * gameSpeedMod;

    this._currentState?.enter();
  }

  protected energyHandler(deltaTime: number) {
    this.runConstInterval(
      () => {
        if (
          this._currentState !==
            this._heroStates?.getState(HeroStatesEnum.ROLL_RIGHT) &&
          this._currentState !==
            this._heroStates?.getState(HeroStatesEnum.ROLL_LEFT) &&
          this._energy < this._maxEnergy
        ) {
          if (
            this._currentState ===
            this._heroStates?.getState(HeroStatesEnum.SIT)
          )
            this._energy += 15;
          else this._energy += 5;
          if (this._energy > this._maxEnergy) this._energy = this._maxEnergy;
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

  // overload the method
  public update({
    deltaTime,
    keys,
    enemies,
    booms,
    floatingMessages,
    collectables,
  }: {
    deltaTime: number;
    keys: BaseKeys[];
    enemies: Enemy[];
    booms: Boom[];
    floatingMessages: FloatingMessage[];
    collectables: Collectable[];
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
    EnemiesCollision.checkCollision(
      this,
      enemies,
      booms,
      this._score,
      floatingMessages
    );

    // collectables collision
    CollectableCollision.checkCollision(this, collectables, floatingMessages);

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

  protected get heroStates(): HeroStates {
    return this._heroStates as HeroStates;
  }

  protected set heroStates(heroStates: HeroStates) {
    this._heroStates = heroStates;
  }

  public get maxEnergy(): number {
    return this._maxEnergy;
  }

  protected set maxEnergy(maxEnergy: number) {
    this._maxEnergy = maxEnergy;
  }

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
    if (energy > this._maxEnergy) this._energy = this._maxEnergy;
    else this._energy = energy;
  }

  public get currentState(): HeroStateInstance | undefined {
    return this._currentState;
  }

  public get score(): number {
    return this._score;
  }

  public set score(score: number) {
    this._score = score;
  }

  public get particles(): Particle[] {
    return this._particles;
  }
}

export default Hero;
