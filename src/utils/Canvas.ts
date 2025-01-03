import BaseResolution from "../constants/BaseResolution";

class Canvas {
  private _id = "game";
  private _tag: HTMLCanvasElement;
  private _ctx: CanvasRenderingContext2D;

  constructor(private readonly baseResolution: typeof BaseResolution) {
    this._tag = document.createElement("canvas");
    this._ctx = this._tag.getContext("2d")!;
    this.init();
  }

  private init() {
    this._tag.id = this._id;
    this._tag.width = this.baseResolution.WIDTH;
    this._tag.height = this.baseResolution.HEIGHT;
  }

  public setBaseStyles(
    width: number,
    height: number,
    { defaultStyles = true } = {}
  ) {
    this._tag.style.width = `${width}px`;
    this._tag.style.height = `${height}px`;

    if (!defaultStyles) return;
    this._tag.style.position = "absolute";
    this._tag.style.top = "50%";
    this._tag.style.left = "50%";
    this._tag.style.transform = "translate(-50%, -50%)";
    this._tag.style.maxWidth = "100%";
    this._tag.style.maxHeight = "100%";
  }

  public create() {
    document.body.appendChild(this._tag);
  }

  public clear() {
    this._ctx.clearRect(
      0,
      0,
      this.baseResolution.WIDTH,
      this.baseResolution.HEIGHT
    );
  }

  // Getter and Setter
  public get id(): string {
    return this._id;
  }

  public set id(id: string) {
    this._id = id;
  }

  public get tag(): HTMLCanvasElement {
    return this._tag;
  }

  public set tag(canvas: HTMLCanvasElement) {
    canvas.setAttribute("id", this._id);
    this._tag = canvas;
  }

  public get width(): number {
    return this._tag.width;
  }

  public set width(width: number) {
    this._tag.width = width;
  }

  public get height(): number {
    return this._tag.height;
  }

  public set height(height: number) {
    this._tag.height = height;
  }

  public get ctx(): CanvasRenderingContext2D {
    return this._ctx;
  }
}

export default Canvas;
