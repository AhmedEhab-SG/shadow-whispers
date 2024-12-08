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
