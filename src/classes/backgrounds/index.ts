import { BackgroundInstance } from "../../types/background";
import Transparent from "./backgroundTypes/Transparent";
import BackgroundsEnum from "../../enum/Backgrounds";

class Backgrounds {
  public static readonly backgrounds = [Transparent];

  public constructor(
    protected gameWidth: number,
    protected gameHeight: number
  ) {}

  getBackgroundsByName(
    unquieName: BackgroundsEnum,
    {
      color,
    }: {
      color?: string;
    } = {}
  ): BackgroundInstance {
    return new (Backgrounds.backgrounds.find(
      (background) => background.unquieName === unquieName
    )!)(this.gameWidth, this.gameHeight, color);
  }
}

export default Backgrounds;
