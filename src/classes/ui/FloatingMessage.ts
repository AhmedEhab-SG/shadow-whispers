import UI from "./UI";

class FloatingMessage extends UI {
  private targetX: number | undefined;
  private targetY: number | undefined;
  private imgSrc: string | undefined;
  private imgSrcSize: number | undefined;
  private imgOffsetX: number | undefined;
  private imgOffsetY: number | undefined;

  private timerRef = { timer: 0 };

  public constructor(
    text: string,
    textX: number,
    textY: number,
    {
      targetX,
      targetY,
      imgSrc,
      imgSrcSize,
      imgOffsetX,
      imgOffsetY,
    }: {
      targetX?: number;
      targetY?: number;
      imgSrc?: string;
      imgSrcSize?: number;
      imgOffsetX?: number;
      imgOffsetY?: number;
    } = {}
  ) {
    super();

    this.targetX = targetX;
    this.targetY = targetY;
    this.imgSrc = imgSrc;
    this.imgSrcSize = imgSrcSize;
    this.imgOffsetX = imgOffsetX;
    this.imgOffsetY = imgOffsetY;

    this.text = text;
    this.textX = textX;
    this.textY = textY;
    this.imgSize = this.imgSrcSize ?? 30;
    this.fontFamily = "Bangers, cursive";
    this.imgX = this.textX + this.imgSize + (this.imgOffsetX ?? 0);
    this.imgY = this.textY - this.imgSize + (this.imgOffsetY ?? 0);

    if (this.imgSrc) {
      this.drawImg = true;
      this.loadImage(this.imgSrc);
    }
  }

  public update({
    deltaTime,
    gameSpeed,
  }: {
    deltaTime: number;
    gameSpeed: number;
  }): void {
    if (this.targetX && this.targetY) {
      this.textX += (this.targetX - this.textX) * 0.02;
      this.textY += (this.targetY - this.textY) * 0.02;
      this.imgX += (this.targetX - this.imgX) * 0.02;
      this.imgY += (this.targetY - this.imgY) * 0.02;
    } else {
      this.textX -= 0.02 + gameSpeed;
      this.imgX -= 0.02 + gameSpeed;
      this.textY -= 15 * 0.02;
      this.imgY -= 15 * 0.02;
    }

    this.runConstInterval(
      () => {
        this.destroy();
      },
      deltaTime,
      this.timerRef
    );
  }
}

export default FloatingMessage;
