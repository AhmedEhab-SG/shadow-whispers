import Collectable from "../Collectable";
import fireImg from "../../../assets/imgs/vfx/fire.png";
import Hero from "../../characters/heroes/Hero";
import Collectables from "../../../enum/Collectables";

class EnergyPlus extends Collectable {
  public static readonly uniqueName = Collectables.ENERGY_PLUS;
  public readonly uniqueName = EnergyPlus.uniqueName;
  public readonly message = "Full Energy";

  public constructor(
    protected gameWidth: number,
    protected gameHeight: number,
    protected enviGroundMargin: number
  ) {
    super(gameWidth, gameHeight, enviGroundMargin, fireImg);

    this.size = 50;
    this.strokeColor = "rgb(250,128,114)";
    this.strokeOffsetY = 5;
    this.storkeSizeScale = -2;

    super.initSize();
  }

  public effect({ hero }: { hero: Hero }): void {
    hero.energy = hero.maxEnergy;
  }
}

export default EnergyPlus;
