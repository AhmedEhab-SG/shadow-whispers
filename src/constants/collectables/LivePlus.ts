import Collectables from "../../enum/Collectables";
import { CollectableObj } from "../../types/collectable";
import heartImg from "../../assets/imgs/ui/heart.png";

class LivePlus {
  static readonly id: number = 1;
  static readonly name: Collectables = Collectables.LIVE_PLUS;
  static readonly size: number = 30;
  static readonly image: string = heartImg;
  static readonly effectMessage: string = "Extra Life!";
  static readonly effectNumber: number = 1;

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

export default LivePlus;
