import FitViewport from "../handlers/FitViewport";

class Resize extends Event {
  public constructor(
    private fitViewport: FitViewport,
    private canvas: HTMLCanvasElement
  ) {
    super("resize");
  }

  public addHandler(): void {
    window.addEventListener("resize", this.handler);
  }

  public removeHandler(): void {
    window.removeEventListener("resize", this.handler);
  }

  private handler = (): void => {
    this.fitViewport.update(innerWidth, innerHeight);
    this.canvas.style.width = `${this.fitViewport.calcWidth()}px`;
    this.canvas.style.height = `${this.fitViewport.calcHeight()}px`;
  };
}

export default Resize;
