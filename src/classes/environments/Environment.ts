import IDrawable from "../../interfaces/IDrawable";
import { EnvironmentObj } from "../../types/environment";
import Layer from "./Layer";

class Environment implements IDrawable {
  private _layers: Layer[] = [];
  private _groundMargin: number = 0;

  constructor(private environmentObj: EnvironmentObj, private height: number) {
    this.init();
  }

  init() {
    this._layers = this.environmentObj.layers.map(
      ({ image, speed }) =>
        new Layer(image, this.environmentObj.width, this.height, speed)
    );

    this._groundMargin =
      (this.environmentObj.groundMargin * this.height) /
      this.environmentObj.height;
  }

  update({ gameSpeed }: { gameSpeed: number }): void {
    this._layers.forEach((layer) => layer.update({ gameSpeed }));
  }

  draw(ctx: CanvasRenderingContext2D) {
    this._layers.forEach((layer) => layer.draw(ctx));
  }

  public get groundMargin() {
    return this._groundMargin;
  }

  public get gravity() {
    return this.environmentObj.gravity;
  }
}

export default Environment;
