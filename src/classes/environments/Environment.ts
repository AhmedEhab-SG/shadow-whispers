import IDrawable from "../../interfaces/IDrawable";
import { EnvironmentObj } from "../../types/environment";
import Layer from "./Layer";

abstract class Environment implements IDrawable {
  private _layers: Layer[] = [];
  private _groundMargin: number;
  private _skyMargin: number;

  protected constructor(
    private environmentObj: EnvironmentObj,
    private height: number
  ) {
    this._layers = this.environmentObj.layers.map(
      ({ image, speed }) =>
        new Layer(image, this.environmentObj.width, this.height, speed)
    );

    this._groundMargin =
      (this.environmentObj.groundMargin * this.height) /
      this.environmentObj.height;

    this._skyMargin =
      (this.environmentObj.skyMargin * this.height) /
      this.environmentObj.height;
  }

  public update({ gameSpeed }: { gameSpeed: number }): void {
    this._layers.forEach((layer) => layer.update({ gameSpeed }));
  }

  public draw(ctx: CanvasRenderingContext2D) {
    this._layers.forEach((layer) => layer.draw(ctx));
  }

  public get groundMargin() {
    return this._groundMargin;
  }

  public get skyMargin() {
    return this._skyMargin;
  }

  public get gravity() {
    return this.environmentObj.gravity;
  }
}

export default Environment;
