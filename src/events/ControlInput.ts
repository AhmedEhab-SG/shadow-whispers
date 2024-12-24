import { ControlActions } from "../types/events";

class ControlInput extends Event {
  private _controlActions: ControlActions = {
    x: 0,
    y: 0,
    isClick: false,
    isHold: false,
  };

  private _holdThreshold = 200; // Threshold in milliseconds
  private _holdTimer: number | null = null;
  private _canvasRect: DOMRect;

  public constructor(private canvas: HTMLCanvasElement) {
    super("controlInput");
    this._canvasRect = this.canvas.getBoundingClientRect();
  }

  public addHandlers(): void {
    // Mouse events
    window.addEventListener("mousedown", this.mouseDownHandler);
    window.addEventListener("mousemove", this.mouseMoveHandler);
    window.addEventListener("mouseup", this.mouseUpHandler);
    window.addEventListener("mouseleave", this.mouseLeaveHandler);

    // Touch events
    window.addEventListener("touchstart", this.touchStartHandler);
    window.addEventListener("touchmove", this.touchMoveHandler);
    window.addEventListener("touchend", this.touchEndHandler);
    window.addEventListener("touchcancel", this.touchCancelHandler);
  }

  public removeHandlers(): void {
    // Mouse events
    window.removeEventListener("mousedown", this.mouseDownHandler);
    window.removeEventListener("mousemove", this.mouseMoveHandler);
    window.removeEventListener("mouseup", this.mouseUpHandler);
    window.removeEventListener("mouseleave", this.mouseLeaveHandler);

    // Touch events
    window.removeEventListener("touchstart", this.touchStartHandler);
    window.removeEventListener("touchmove", this.touchMoveHandler);
    window.removeEventListener("touchend", this.touchEndHandler);
    window.removeEventListener("touchcancel", this.touchCancelHandler);
  }

  private getMousePos(e: MouseEvent | TouchEvent): { x: number; y: number } {
    const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
    const clientY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;

    const scaleX = this.canvas.width / this._canvasRect.width;
    const scaleY = this.canvas.height / this._canvasRect.height;

    return {
      x: (clientX - this._canvasRect.left) * scaleX,
      y: (clientY - this._canvasRect.top) * scaleY,
    };
  }

  private isMouseInCanvas(e: MouseEvent | TouchEvent): boolean {
    const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
    const clientY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;

    return (
      !this._canvasRect ||
      this._canvasRect.x > clientX ||
      clientX > this._canvasRect.x + this._canvasRect.width ||
      this._canvasRect.y > clientY ||
      clientY > this._canvasRect.y + this._canvasRect.height
    );
  }

  private mouseDownHandler = (e: MouseEvent): void => {
    this._canvasRect = this.canvas.getBoundingClientRect();

    if (this.isMouseInCanvas(e)) {
      return;
    }

    const { x, y } = this.getMousePos(e);
    this._controlActions = {
      x,
      y,
      isClick: true,
      isHold: false,
    };

    // Start the hold timer
    this._holdTimer = window.setTimeout(() => {
      this._controlActions.isClick = false;
      this._controlActions.isHold = true;
    }, this._holdThreshold);
  };

  private mouseMoveHandler = (e: MouseEvent): void => {
    this._canvasRect = this.canvas.getBoundingClientRect();

    if (this.isMouseInCanvas(e)) {
      this._controlActions = {
        ...this._controlActions,
        x: 0,
        y: 0,
      };
      return;
    }

    const { x, y } = this.getMousePos(e);
    this._controlActions = {
      ...this._controlActions,
      x,
      y,
    };
  };

  private mouseUpHandler = (): void => {
    // Clear the hold timer
    if (this._holdTimer !== null) {
      clearTimeout(this._holdTimer);
      this._holdTimer = null;
    }

    this._controlActions = {
      ...this._controlActions,
      isClick: false,
      isHold: false,
    };
  };

  private mouseLeaveHandler = (): void => {
    // Clear the hold timer
    if (this._holdTimer !== null) {
      clearTimeout(this._holdTimer);
      this._holdTimer = null;
    }

    this._controlActions = {
      ...this._controlActions,
      x: 0,
      y: 0,
      isClick: false,
      isHold: false,
    };
  };

  private touchStartHandler = (e: TouchEvent): void => {
    this._canvasRect = this.canvas.getBoundingClientRect();

    if (this.isMouseInCanvas(e)) {
      return;
    }

    const { x, y } = this.getMousePos(e);
    this._controlActions = {
      x,
      y,
      isClick: true,
      isHold: false,
    };

    // Start the hold timer
    this._holdTimer = window.setTimeout(() => {
      this._controlActions.isClick = false;
      this._controlActions.isHold = true;
    }, this._holdThreshold);
  };

  private touchMoveHandler = (e: TouchEvent): void => {
    this._canvasRect = this.canvas.getBoundingClientRect();

    if (this.isMouseInCanvas(e)) {
      this._controlActions = {
        ...this._controlActions,
        x: 0,
        y: 0,
      };
      return;
    }

    const { x, y } = this.getMousePos(e);
    this._controlActions = {
      ...this._controlActions,
      x,
      y,
    };
  };

  private touchEndHandler = (): void => {
    // Clear the hold timer
    if (this._holdTimer !== null) {
      clearTimeout(this._holdTimer);
      this._holdTimer = null;
    }

    this._controlActions = {
      ...this._controlActions,
      isClick: false,
      isHold: false,
    };
  };

  private touchCancelHandler = (): void => {
    // Clear the hold timer
    if (this._holdTimer !== null) {
      clearTimeout(this._holdTimer);
      this._holdTimer = null;
    }

    this._controlActions = {
      ...this._controlActions,
      x: 0,
      y: 0,
      isClick: false,
      isHold: false,
    };
  };

  public get controlActions(): ControlActions {
    return this._controlActions;
  }
}

export default ControlInput;
