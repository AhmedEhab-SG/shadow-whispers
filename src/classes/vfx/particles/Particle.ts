import Sprite from "../../../utils/Sprite";

abstract class Particle extends Sprite {
  private _x = 0;
  private _y = 0;
  private _size = 0;

  private _vx = 0;
  private _vy = 0;

  private _markForDelete = false;

  public destroy(): void {
    this._markForDelete = true;
  }

  public update({ gameSpeed }: { gameSpeed: number }): void {
    this._x -= this._vx + gameSpeed;
  }

  protected fadeParticle({
    sizeMod = 0.98,
    minSize = 0.5,
  }: {
    sizeMod?: number;
    minSize?: number;
  } = {}): void {
    this._size *= sizeMod;

    if (this._size < minSize) this.destroy();
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;

  // Getters and Setters
  public get markDelete() {
    return this._markForDelete;
  }

  protected get x() {
    return this._x;
  }

  protected set x(value: number) {
    this._x = value;
  }

  protected get y() {
    return this._y;
  }

  protected set y(value: number) {
    this._y = value;
  }

  protected get size() {
    return this._size;
  }

  protected set size(value: number) {
    this._size = value;
  }

  protected get vx() {
    return this._vx;
  }

  protected set vx(value: number) {
    this._vx = value;
  }

  protected get vy() {
    return this._vy;
  }

  protected set vy(value: number) {
    this._vy = value;
  }
}

export default Particle;
