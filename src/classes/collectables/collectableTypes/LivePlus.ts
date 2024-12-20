import Collectable from "../Collectable";
import heartImg from "../../../assets/imgs/ui/heart.png";
import Hero from "../../characters/heroes/Hero";
import Collectables from "../../../enum/Collectables";

class LivePlus extends Collectable {
  public static readonly uniqueName = Collectables.LIVE_PLUS;
  public readonly uniqueName = LivePlus.uniqueName;
  public readonly message = "Extra Life";

  public constructor(
    protected gameWidth: number,
    protected gameHeight: number,
    protected enviGroundMargin: number
  ) {
    super(gameWidth, gameHeight, enviGroundMargin, heartImg);

    this.size = 30;
    this.strokeOffsetY = -1;
    this.storkeSizeScale = 6;

    super.initSize();
  }

  public effect({ hero }: { hero: Hero }): void {
    hero.lives++;
  }
}

export default LivePlus;
