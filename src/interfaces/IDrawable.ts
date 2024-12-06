import DefaultKeys from "../enum/BaseKeys";

interface IDrawable {
  update({
    deltaTime,
    keys,
    cords,
    gameSpeed,
  }: {
    deltaTime: number;
    keys: DefaultKeys[];
    cords: { x: number; y: number };
    gameSpeed: number;
  }): void;
  draw(ctx: CanvasRenderingContext2D, debugMode?: boolean): void;
}

export default IDrawable;
