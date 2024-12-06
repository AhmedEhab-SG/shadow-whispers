import Sprite from "../../utils/Sprite";
import BoomObj from "../../constants/vfx/Boom";

class Boom extends Sprite {
  private sizeScale = Math.random() * 0.5 + 0.5;
  private width = 0;
  private height = 0;

  private _markForDelete = false;

  private _timerRef = { timer: 0 };

  private _frameX = 0;

  constructor(
    private x: number,
    private y: number,
    private targetWidth: number,
    private targetHeight: number
  ) {
    super();
    this.loadImage(BoomObj.image);

    this.width = BoomObj.frame.width * this.sizeScale * this.targetWidth * 0.01;
    this.height =
      BoomObj.frame.height * this.sizeScale * this.targetHeight * 0.01;

    this.x -= this.width * 0.5;
    this.y -= this.height * 0.5;
  }

  public update({
    deltaTime,
    gameSpeed,
  }: {
    deltaTime: number;
    gameSpeed: number;
  }): void {
    this.x -= gameSpeed;

    this.runConstInterval(
      () => {
        this._frameX++;
      },
      deltaTime,
      this._timerRef,
      {
        fps: BoomObj.fps,
      }
    );

    if (this._frameX >= BoomObj.maxFrameX) this.destroy();
  }

  public destroy(): void {
    this._markForDelete = true;
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    if (!this.imgLoaded) return;

    ctx.drawImage(
      this.image,
      this._frameX * BoomObj.frame.width,
      0,
      BoomObj.frame.width,
      BoomObj.frame.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  // Getters and Setters
  public get markForDelete() {
    return this._markForDelete;
  }

  public get frameX() {
    return this._frameX;
  }

  public get maxFrameX() {
    return BoomObj.maxFrameX;
  }
}

export default Boom;
