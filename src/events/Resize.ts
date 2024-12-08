import ScreenViewport from "../handlers/ScreenViewport";

class Resize extends Event {
  public constructor(
    private screenViewport: ScreenViewport,
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
    this.canvas.style.width = `${this.screenViewport.calculateWidth()}px`;
    this.canvas.style.height = `${this.screenViewport.calculateHeight()}px`;
  };
}

export default Resize;
