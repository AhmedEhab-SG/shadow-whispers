import { VfxObj } from "../../types/vfx";
import boomImg from "../../assets/sprite/vfx/boom.png";

class Boom {
  static id: number = 1;
  static name: string = "boom";
  static image: string = boomImg;
  static fps: number = 10;
  static maxFrameX: number = 4;
  static sprite = {
    width: 1000,
    height: 179,
  };
  static frame = {
    width: 200,
    height: 179,
  };

  static get vfxObj(): VfxObj {
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
