import Sprite from "../../utils/Sprite";

abstract class Background extends Sprite {
  private _x = 0;
  private _y = 0;

  protected constructor(
    protected gameWidth: number,
    protected gameHeight: number
  ) {
    super();
  }

  public abstract update({}: {}): void;

  public draw(ctx: CanvasRenderingContext2D): void {
    if (!this.imgLoaded) return;

    ctx.drawImage(this.image, this.x, this.y, this.gameWidth, this.gameHeight);
  }

  protected get x() {
    return this._x;
  }

  protected set x(value) {
    this._x = value;
  }

  protected get y() {
    return this._y;
  }

  protected set y(value) {
    this._y = value;
  }
}

export default Background;
