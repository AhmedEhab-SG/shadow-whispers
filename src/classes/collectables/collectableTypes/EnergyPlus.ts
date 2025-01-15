import Collectable from "../Collectable";
import Hero from "../../characters/heroes/Hero";
import EnergyPlusObj from "../../../constants/collectables/EnergyPlus";

class EnergyPlus extends Collectable {
  public static readonly uniqueName = EnergyPlusObj.name;
  public readonly uniqueName = EnergyPlus.uniqueName;

  public constructor(
    protected gameWidth: number,
    protected gameHeight: number,
    protected enviGroundMargin: number,
    protected enviSkyMargin: number
  ) {
    super(
      gameWidth,
      gameHeight,
      enviGroundMargin,
      enviSkyMargin,
      EnergyPlusObj.collectableObj
    );

    this.strokeColor = "rgb(250,128,114)";
    this.strokeOffsetY = 5;
    this.storkeSizeScale = -2;
  }

  public effect({ hero }: { hero: Hero }): void {
    hero.energy += EnergyPlusObj.effectNumber;
  }
}

export default EnergyPlus;
