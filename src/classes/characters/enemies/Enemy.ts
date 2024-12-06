import EnemyStates from "../../../handlers/states/enemyStates";
import EnemyStatesEnum from "../../../enum/EnemyStates";
import { EnemyObj, EnemyStateInstance } from "../../../types/enemy";
import Character from "../Character";

abstract class Enemy extends Character {
  private _markForDelete = false;

  private _enemyStates: EnemyStates;
  private _currentState?: EnemyStateInstance;

  private _vFrameX: number = 1;

  constructor(protected enemyObj: EnemyObj) {
    super();
    this.loadImage(this.enemyObj.image);

    this.width = this.enemyObj.frame.width;
    this.height = this.enemyObj.frame.height;

    this._enemyStates = new EnemyStates(this, this.enemyObj);

    this.setState(EnemyStatesEnum.ENGAGE);
  }

  public setState(state: EnemyStatesEnum): void {
    this._currentState?.exit();
    this._currentState = this._enemyStates?.getState(state);
    this._currentState?.enter();
  }

  public destroy(): void {
    this._markForDelete = true;
  }

  public update({
    deltaTime,
    gameSpeed,
  }: {
    deltaTime: number;
    gameSpeed: number;
  }): void {
    this.animateCharacter(deltaTime, this.enemyObj.fps);

    // move left with velocity with respect to game speed
    this.x -= this.vx + gameSpeed;

    this.y += this.vy;

    if (this.x + this.width < 0) this.destroy();
  }

  public draw(ctx: CanvasRenderingContext2D, debugMode: boolean): void {
    if (!this.imgLoaded) return;

    if (debugMode) this.debug(ctx, this.x, this.y, this.width, this.height);

    ctx.save();
    if (this.reverseImg) ctx.scale(-1, 1);
    ctx.drawImage(
      this.image,
      this.frameX * this.enemyObj.frame.width,
      0,
      this.enemyObj.frame.width,
      this.enemyObj.frame.height,
      this.reverseImg ? -this.x - this.width : this.x,
      this.y,
      this.width,
      this.height
    );
    ctx.restore();
  }

  // Getters and Setters
  public get markForDelete(): boolean {
    return this._markForDelete;
  }

  public get currentState(): EnemyStateInstance | undefined {
    return this._currentState;
  }

  public get enemyStates(): EnemyStates {
    return this._enemyStates;
  }

  protected set vFrameX(vFrameX: number) {
    this._vFrameX = vFrameX;
  }

  protected get vFrameX(): number {
    return this._vFrameX;
  }
}

export default Enemy;
