class Orientation extends Event {
  public constructor() {
    super("orientation");
  }

  public addHandler(): void {
    screen.orientation.addEventListener("change", this.handler);
  }

  public removeHandler(): void {
    screen.orientation.removeEventListener("change", this.handler);
  }

  private handler = (): void => {
    if (screen.orientation.type.startsWith("portrait")) {
      if ("lock" in screen.orientation)
        (screen.orientation as any).lock("landscape");
    }
  };
}

export default Orientation;
