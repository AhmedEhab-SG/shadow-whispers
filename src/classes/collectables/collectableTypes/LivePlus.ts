import Collectable from "../Collectable";
import Hero from "../../characters/heroes/Hero";
import LivePlusObj from "../../../constants/collectables/LivePlus";

class LivePlus extends Collectable {
  public static readonly uniqueName = LivePlusObj.name;
  public readonly uniqueName = LivePlus.uniqueName;

  public constructor(
    protected gameWidth: number,
    protected gameHeight: number,
    protected enviGroundMargin: number
  ) {
    super(gameWidth, gameHeight, enviGroundMargin, LivePlusObj.collectableObj);

    this.strokeColor = "rgb(84, 207, 46)";
    this.strokeOffsetY = -1;
    this.storkeSizeScale = 6;
  }

  public effect({ hero }: { hero: Hero }): void {
    hero.lives += LivePlusObj.effectNumber;
  }
}

export default LivePlus;
