import BaseKeys from "../enum/BaseKeys";
import IDrawable from "../interfaces/IDrawable";
import { ControlActions } from "../types/events";
import Interval from "./Interval";

abstract class Sprite extends Interval implements IDrawable {
  protected image: HTMLImageElement = new Image();
  protected imgLoaded: boolean = false;

  protected loadImage(srcImage: string) {
    this.image.src = srcImage;
    this.image.onload = () => {
      this.imgLoaded = true;
    };
  }

  abstract update({
    deltaTime,
    keys,
    controlActions,
    gameSpeed,
  }: {
    deltaTime: number;
    keys: BaseKeys[];
    controlActions: ControlActions;
    gameSpeed: number;
  }): void;

  abstract draw(ctx: CanvasRenderingContext2D, debugMode: boolean): void;

  protected debug(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,

    {
      lineWidth = 3,
      color = "red" as "red" | "lightgreen" | "blue",
      offestX = 0.5,
      offestY = 0.5,
      offsetWidth = 0.5,
    } = {}
  ) {
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.arc(
      x + width * offestX,
      y + height * offestY,
      width * offsetWidth,
      0,
      Math.PI * 2
    );
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  }
}

export default Sprite;
