import Collectables from "../../enum/Collectables";
import { CollectableObj } from "../../types/collectable";
import fireImg from "../../assets/imgs/vfx/fire.png";

class EnergyPlus {
  static readonly id: number = 2;
  static readonly name: Collectables = Collectables.ENERGY_PLUS;
  static readonly image: string = fireImg;
  static readonly size: number = 50;
  static readonly effectMessage: string = "Full Energy!";
  static readonly effectNumber: number = 999;

  public static get collectableObj(): CollectableObj {
    return {
      id: this.id,
      name: this.name,
      image: this.image,
      size: this.size,
      effectMessage: this.effectMessage,
      effectNumber: this.effectNumber,
    };
  }
}

export default EnergyPlus;
