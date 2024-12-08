import { VfxObj } from "../../types/vfx";
import boomImg from "../../assets/sprite/vfx/boom.png";

class Boom {
  public static id: number = 1;
  public static name: string = "boom";
  public static image: string = boomImg;
  public static fps: number = 10;
  public static maxFrameX: number = 4;
  public static sprite = {
    width: 1000,
    height: 179,
  };
  public static frame = {
    width: 200,
    height: 179,
  };

  public static get vfxObj(): VfxObj {
    return {
      id: Boom.id,
      name: Boom.name,
      image: Boom.image,
      fps: Boom.fps,
      maxFrameX: Boom.maxFrameX,
      sprite: Boom.sprite,
      frame: Boom.frame,
    };
  }
}

export default Boom;
