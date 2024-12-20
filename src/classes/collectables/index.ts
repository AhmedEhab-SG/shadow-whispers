import CollectablesEnum from "../../enum/Collectables";
import { CollectableInstance } from "../../types/collectable";
import EnergyPlus from "./collectableTypes/EnergyPlus";
import LivePlus from "./collectableTypes/LivePlus";

class Collectables {
  public static readonly CollectableTypes = [EnergyPlus, LivePlus];

  public constructor(
    protected gameWidth: number,
    protected gameHeight: number,
    protected enviGroundMargin: number
  ) {}

  public getRandomCollectable(): CollectableInstance {
    return new Collectables.CollectableTypes[
      Math.floor(Math.random() * Collectables.CollectableTypes.length)
    ](this.gameWidth, this.gameHeight, this.enviGroundMargin);
  }

  public getCollectableByName(
    uniqueName: CollectablesEnum
  ): CollectableInstance {
    return new (Collectables.CollectableTypes.find(
      (collectable) => collectable.uniqueName === uniqueName
    )!)(this.gameWidth, this.gameHeight, this.enviGroundMargin);
  }
}

export default Collectables;
