import Backgrounds from "../../../enum/Backgrounds";
import Background from "../Background";

class Transparent extends Background {
  public static readonly unquieName = Backgrounds.TRNASPARENT;
  public readonly unquieName = Transparent.unquieName;

  public constructor(
    protected gameWidth: number,
    protected gameHeight: number,
    private color = "rgba(0, 0, 0, 0.5)"
  ) {
    super(gameWidth, gameHeight);
  }

  public update({}: {}): void {}

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
    ctx.restore();
  }
}

export default Transparent;
