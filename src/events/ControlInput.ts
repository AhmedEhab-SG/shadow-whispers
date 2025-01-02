import { ControlActions } from "../types/events";

class ControlInput extends Event {
  private _controlActions: ControlActions = {
    x: 0,
    y: 0,
    isClick: false,
    isHold: false,
    isTouch: false,
    startCord: { x: 0, y: 0 },
    startCords: [],
    touches: [],
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

  private getActionPos(e: MouseEvent | TouchEvent): {
    x: number;
    y: number;
    touches: { x: number; y: number; identifier: number }[];
  } {
    const clientX = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
    const clientY = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;

    const scaleX = this.canvas.width / this._canvasRect.width;
    const scaleY = this.canvas.height / this._canvasRect.height;

    return {
      x: (clientX - this._canvasRect.left) * scaleX,
      y: (clientY - this._canvasRect.top) * scaleY,
      touches:
        e instanceof TouchEvent
          ? [...e.changedTouches].map((t) => ({
              x: (t.clientX - this._canvasRect.left) * scaleX,
              y: (t.clientY - this._canvasRect.top) * scaleY,
              identifier: t.identifier,
            }))
          : [],
    };
  }

  private isActionInCanvas(e: MouseEvent | TouchEvent): boolean {
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

  private resetControlActions(): void {
    this._controlActions = {
      ...this._controlActions,
      x: 0,
      y: 0,
      isClick: false,
      isHold: false,
      isTouch: false,
      startCord: { x: 0, y: 0 },
      startCords: [],
      touches: [],
    };
  }

  private mouseDownHandler = (e: MouseEvent): void => {
    this._canvasRect = this.canvas.getBoundingClientRect();

    if (this.isActionInCanvas(e)) return this.resetControlActions();

    const { x, y } = this.getActionPos(e);
    this._controlActions = {
      x,
      y,
      isClick: true,
      isHold: false,
      isTouch: false,
      startCord: { x, y },
      startCords: [],
      touches: [],
    };

    // Start the hold timer
    this._holdTimer = window.setTimeout(() => {
      this._controlActions.isClick = false;
      this._controlActions.isHold = true;
    }, this._holdThreshold);
  };

  private mouseMoveHandler = (e: MouseEvent): void => {
    this._canvasRect = this.canvas.getBoundingClientRect();

    if (this.isActionInCanvas(e)) return this.resetControlActions();

    const { x, y } = this.getActionPos(e);
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

    this.resetControlActions();
  };

  private touchStartHandler = (e: TouchEvent): void => {
    this._canvasRect = this.canvas.getBoundingClientRect();

    if (this.isActionInCanvas(e)) return this.resetControlActions();

    const { x, y, touches } = this.getActionPos(e);
    this._controlActions = {
      x,
      y,
      isClick: true,
      isHold: false,
      isTouch: true,
      startCord: { x, y },
      touches,
      startCords: touches,
    };

    // Start the hold timer
    this._holdTimer = window.setTimeout(() => {
      this._controlActions.isClick = false;
      this._controlActions.isHold = true;
    }, this._holdThreshold);
  };

  private touchMoveHandler = (e: TouchEvent): void => {
    this._canvasRect = this.canvas.getBoundingClientRect();

    if (this.isActionInCanvas(e)) return this.resetControlActions();

    const { x, y, touches } = this.getActionPos(e);

    this._controlActions = {
      ...this._controlActions,
      x,
      y,
      touches,
    };
  };

  private touchEndHandler = (e: TouchEvent): void => {
    // Clear the hold timer
    if (this._holdTimer !== null) {
      clearTimeout(this._holdTimer);
      this._holdTimer = null;
    }

    // Update touches to remove the ended touch
    const endedTouchIds = [...e.changedTouches].map((t) => t.identifier);
    this._controlActions.touches = this._controlActions.touches.filter(
      (t) => !endedTouchIds.includes(t.identifier)
    );

    if (this._controlActions.touches.length === 0) {
      this.resetControlActions();
    }
  };

  private touchCancelHandler = (e: TouchEvent): void => {
    // Clear the hold timer
    if (this._holdTimer !== null) {
      clearTimeout(this._holdTimer);
      this._holdTimer = null;
    }

    // Update touches to remove the canceled touch
    const canceledTouchIds = [...e.changedTouches].map((t) => t.identifier);
    this._controlActions.touches = this._controlActions.touches.filter(
      (t) => !canceledTouchIds.includes(t.identifier)
    );

    if (this._controlActions.touches.length === 0) {
      this.resetControlActions();
    }
  };

  public get controlActions(): ControlActions {
    return this._controlActions;
  }
}

export default ControlInput;
