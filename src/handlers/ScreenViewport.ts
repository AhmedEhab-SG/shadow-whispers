import AspectRatio from "../enum/AspectRatio";

class ScreenViewport {
  public constructor(private _aspectRatio: AspectRatio) {}

  public calculateWidth(): number {
    return Math.floor(innerWidth);
  }

  public calculateHeight(): number {
    return Math.floor(this.calculateWidth() / this._aspectRatio);
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
