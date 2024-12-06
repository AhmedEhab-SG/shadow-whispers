import Interval from "./Interval";

abstract class GameUtils extends Interval {
  protected setStylesResolutionToCanvas(
    canvas: HTMLCanvasElement,
    width: number,
    hight: number
  ): void {
    canvas.style.width = `${width}px`;
    canvas.style.height = `${hight}px`;
  }
}

export default GameUtils;
