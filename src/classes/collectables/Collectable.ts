import { CollectableObj } from "../../types/collectable";
import Sprite from "../../utils/Sprite";
import Hero from "../characters/heroes/Hero";

abstract class Collectable extends Sprite {
  private _x: number = 0;
  private _y: number = 0;
  private offsetY = 30;
  private _gameHightRange: number = 0.5;
  private _size: number = 0;
  private _maxSize: number = 0;
  private _minSize: number = 0;
  private _sizeScale = 0.1;
  private _maxSizeScale = 1.2;
  private _minSizeScale = 0.8;
  private scalingInitDir = true;

  private _maxLifeTime = 30 * 1000; // 30 seconds
  private lifeTimeRef = { timer: 0 };

  private _markForDelete = false;

  private _strokeColor: string = "black";
  private _strokeSize: number = 2;
  private _strokeOffsetX: number = 0;
  private _strokeOffsetY: number = 0;
  private _storkeSizeScale = 1;

  private readonly _effectMessage: string;
  private readonly _effectNumber: number;

  protected constructor(
    protected gameWidth: number,
    protected gameHeight: number,
    protected enviGroundMargin: number,
    protected enviSkyMargin: number,
    protected collectableObj: CollectableObj
  ) {
    super();
    this.loadImage(collectableObj.image);

    this.x = this.gameWidth;

    this._effectMessage = collectableObj.effectMessage;
    this._effectNumber = collectableObj.effectNumber;

    this.y =
      this.enviSkyMargin +
      Math.random() *
        (this.gameHeight -
          this.enviSkyMargin -
          this.size -
          this.enviGroundMargin -
          this.offsetY);

    this.size = collectableObj.size;
    this._maxSize = this.size * this._maxSizeScale;
    this._minSize = this.size * this._minSizeScale;
  }

  public abstract effect({}: { hero: Hero }): void;

  public destroy(): void {
    this.markForDelete = true;
  }

  public update({
    deltaTime,
    gameSpeed,
  }: {
    deltaTime: number;
    gameSpeed: number;
  }): void {
    this.x -= gameSpeed;

    const previousSize = this.size;

    if (this.scalingInitDir) this._size += this._sizeScale;
    else this._size -= this._sizeScale;

    if (this.size > this._maxSize) this.scalingInitDir = false;
    else if (this.size < this._minSize) this.scalingInitDir = true;

    // Adjust position to keep scaling centered
    const sizeChange = this._size - previousSize;
    this.x -= sizeChange * 0.5;
    this.y -= sizeChange * 0.5;

    this.runConstInterval(() => this.destroy(), deltaTime, this.lifeTimeRef, {
      interval: this.maxLifeTime,
    });

    if (this.x + this.size < 0) this.destroy();
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    if (!this.imgLoaded) return;

    ctx.save();
    ctx.drawImage(this.image, this._x, this._y, this._size, this._size);
    ctx.strokeStyle = this._strokeColor;
    ctx.lineWidth = this._strokeSize;
    ctx.beginPath();
    ctx.arc(
      this.x + this.size * 0.5 + this.strokeOffsetX,
      this.y + this.size * 0.5 + this._strokeOffsetY,
      this.size * 0.5 + this._storkeSizeScale,
      0,
      Math.PI * 2
    );
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }

  // Getters and Setters
  public get x(): number {
    return this._x;
  }

  protected set x(x: number) {
    this._x = x;
  }

  public get y(): number {
    return this._y;
  }

  protected set y(y: number) {
    this._y = y;
  }

  protected get gameHightRange(): number {
    return this._gameHightRange;
  }

  protected set gameHightRange(gameHightRange: number) {
    this._gameHightRange = gameHightRange;
  }

  public get size(): number {
    return this._size;
  }

  protected set size(size: number) {
    this._size = size;
  }

  protected get maxSize(): number {
    return this._maxSize;
  }

  protected set maxSize(maxSize: number) {
    this._maxSize = maxSize;
  }

  protected get minSize(): number {
    return this._minSize;
  }

  protected set minSize(minSize: number) {
    this._minSize = minSize;
  }

  protected get sizeScale(): number {
    return this._sizeScale;
  }

  protected set sizeScale(sizeScale: number) {
    this._sizeScale = sizeScale;
  }

  protected get maxSizeScale(): number {
    return this._maxSizeScale;
  }

  protected set maxSizeScale(maxSizeScale: number) {
    this._maxSizeScale = maxSizeScale;
  }

  protected get minSizeScale(): number {
    return this._minSizeScale;
  }

  protected set minSizeScale(minSizeScale: number) {
    this._minSizeScale = minSizeScale;
  }

  protected get maxLifeTime(): number {
    return this._maxLifeTime;
  }

  protected set maxLifeTime(maxLifeTime: number) {
    this._maxLifeTime = maxLifeTime;
  }

  public get markForDelete(): boolean {
    return this._markForDelete;
  }

  protected set markForDelete(markForDelete: boolean) {
    this._markForDelete = markForDelete;
  }

  protected get strokeColor(): string {
    return this._strokeColor;
  }

  protected set strokeColor(strokeColor: string) {
    this._strokeColor = strokeColor;
  }

  protected get strokeSize(): number {
    return this.strokeSize;
  }

  protected set strokeSize(strokeSize: number) {
    this.strokeSize = strokeSize;
  }

  protected get strokeOffsetX(): number {
    return this._strokeOffsetX;
  }

  protected set strokeOffsetX(strokeOffsetX: number) {
    this._strokeOffsetX = strokeOffsetX;
  }

  protected get strokeOffsetY(): number {
    return this._strokeOffsetY;
  }

  protected set strokeOffsetY(strokeOffsetY: number) {
    this._strokeOffsetY = strokeOffsetY;
  }

  protected get storkeSizeScale(): number {
    return this._storkeSizeScale;
  }

  protected set storkeSizeScale(storkeSizeScale: number) {
    this._storkeSizeScale = storkeSizeScale;
  }

  public get effectMessage(): string {
    return this._effectMessage;
  }

  public get effectNumber(): number {
    return this._effectNumber;
  }
}

export default Collectable;
