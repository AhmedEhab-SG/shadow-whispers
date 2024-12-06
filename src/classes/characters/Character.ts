import BaseKeys from "../../enum/BaseKeys";
import Sprite from "../../utils/Sprite";
import Boom from "../vfx/Boom";
import Enemy from "./enemies/Enemy";

abstract class Character extends Sprite {
  private _width = 0;
  private _height = 0;
  private _sizeScale = 1;
  private _x = 0;
  private _y = 0;
  private _timeRef = { timer: 0 };

  private _vx = 0; // Velocity x
  private _vy = 0;

  private _reverseImg = false;

  private _frameX = 0;
  private _frameY = 0;
  private _maxFrameX = 0;

  protected animateCharacter(deltaTime: number, fps: number): void {
    this.runConstInterval(
      () => {
        if (this.frameX < this.maxFrameX) this.frameX++;
        else this.frameX = 0;
      },
      deltaTime,
      this._timeRef,
      { fps }
    );
  }

  abstract update({
    deltaTime,
    keys,
    cords,
    gameSpeed,
    enemies,
    booms,
  }: {
    deltaTime: number;
    keys: BaseKeys[];
    cords: { x: number; y: number };
    gameSpeed: number;
    enemies: Enemy[];
    booms: Boom[];
  }): void;

  // Getters and Setters
  public get width() {
    return this._width * this._sizeScale;
  }

  protected set width(value: number) {
    this._width = value * this._sizeScale;
  }

  public get height() {
    return this._height * this._sizeScale;
  }

  protected set height(value: number) {
    this._height = value * this._sizeScale;
  }

  protected get sizeScale() {
    return this._sizeScale;
  }

  protected set sizeScale(value: number) {
    this._sizeScale = value;
  }

  public get x() {
    return this._x;
  }

  public set x(value: number) {
    this._x = value;
  }

  public get y() {
    return this._y;
  }

  public set y(value: number) {
    this._y = value;
  }

  public get vx() {
    return this._vx;
  }

  public set vx(value: number) {
    this._vx = value;
  }

  public get vy() {
    return this._vy;
  }

  public set vy(value: number) {
    this._vy = value;
  }

  public get reverseImg() {
    return this._reverseImg;
  }

  public set reverseImg(value: boolean) {
    this._reverseImg = value;
  }

  public get frameX() {
    return this._frameX;
  }

  public set frameX(value: number) {
    this._frameX = value;
  }

  public get frameY() {
    return this._frameY;
  }

  public set frameY(value: number) {
    this._frameY = value;
  }

  public get maxFrameX() {
    return this._maxFrameX;
  }

  public set maxFrameX(value: number) {
    this._maxFrameX = value;
  }
}

export default Character;
