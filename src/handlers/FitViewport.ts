import AspectRatio from "../enum/AspectRatio";

class FitViewport {
  private _width = innerWidth;
  private _height = innerHeight;

  public constructor(private _aspectRatio: AspectRatio) {}

  private updateDimensions(): void {
    if (this._width / this._aspectRatio > this._height)
      this._width = this._height * this._aspectRatio;
    else this._height = this._width / this._aspectRatio;
  }

  public calcWidth(): number {
    return Math.floor(this._width);
  }

  public calcHeight(): number {
    return Math.floor(this._height);
  }

  public update(width: number, height: number): void {
    this._width = width;
    this._height = height;
    this.updateDimensions();
  }

  // Getter and Setter
  public get aspectRatio(): AspectRatio {
    return this._aspectRatio;
  }

  public set aspectRatio(aspectRatio: AspectRatio) {
    this._aspectRatio = aspectRatio;
  }

  public get width(): number {
    return this._width;
  }

  public get height(): number {
    return this._height;
  }
}

export default FitViewport;
