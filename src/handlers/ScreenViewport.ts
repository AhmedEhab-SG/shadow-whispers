import AspectRatio from "../enum/AspectRatio";

class ScreenViewport {
  public constructor(private _aspectRatio: AspectRatio) {}

  public calcWidth(): number {
    return Math.floor(innerWidth);
  }

  public calcHeight(): number {
    return Math.floor(this.calcWidth() / this._aspectRatio);
  }

  // Getter and Setter
  public get aspectRatio(): AspectRatio {
    return this._aspectRatio;
  }

  public set aspectRatio(aspectRatio: AspectRatio) {
    this._aspectRatio = aspectRatio;
  }
}

export default ScreenViewport;
