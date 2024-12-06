class ControlMouse extends Event {
  private _cords: { x: number; y: number } = { x: 0, y: 0 };
  private _canvasRect: DOMRect;

  constructor(private canvas: HTMLCanvasElement) {
    super("controlMouse");
    this._canvasRect = this.canvas.getBoundingClientRect();
  }

  public addHandlers(): void {
    window.addEventListener("mousedown", this.mouseDownHandler);
    window.addEventListener("mousemove", this.mouseMoveHandler);
    window.addEventListener("mouseup", this.mouseUpHandler);
  }

  public removeHandlers(): void {
    window.removeEventListener("mousedown", this.mouseDownHandler);
    window.removeEventListener("mousemove", this.mouseMoveHandler);
    window.removeEventListener("mouseup", this.mouseUpHandler);
  }

  private mouseDownHandler = (e: MouseEvent): void => {
    this._canvasRect = this.canvas.getBoundingClientRect();

    if (
      !this._canvasRect ||
      this._canvasRect.x > e.clientX ||
      e.clientX > this._canvasRect.x + this._canvasRect.width ||
      this._canvasRect.y > e.clientY ||
      e.clientY > this._canvasRect.y + this._canvasRect.height
    ) {
      return;
    }

    this._cords = {
      x: e.clientX - this._canvasRect.x,
      y: e.clientY - this._canvasRect.y,
    };
  };

  private mouseMoveHandler = (e: MouseEvent): void => {
    if (!this._cords.x && !this._cords.y) return;

    this._cords = {
      x: e.clientX - this._canvasRect.x,
      y: e.clientY - this._canvasRect.y,
    };
  };

  private mouseUpHandler = (): void => {
    if (!this._cords.x && !this._cords.y) return;

    this._cords = { x: 0, y: 0 };
  };

  get cords(): { x: number; y: number } {
    return this._cords;
  }
}

export default ControlMouse;
