import { ControlActions } from "../../../../types/events";
import Vector from "./Vector";
import DefaultKeys from "../../../../enum/BaseKeys";
import UI from "../../UI";

class JoyStick extends UI {
  private x: number;
  private y: number;
  private radius: number;
  private handleRadius: number;

  private cord: Vector;
  private origin: Vector;
  private handleColor: string; //Color of the joystick handle
  private originColor: string; //Color of the joystick origin

  private handleFriction: number; //Friction for the handle to return to center
  private touchThreshold: number; //Threshold for the

  private touchCord: Vector = new Vector(0, 0);

 public constructor({
    x = 75,
    y = 75,
    radius = 50,
    handleRadius = 25,
    handleFriction = 0.25,
    touchThreshold = 20,
    handleColor = "gray",
    originColor = "rgba(0, 0, 0, 0.25)",
  } = {}) {
    super();
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.handleRadius = handleRadius;
    this.cord = new Vector(this.x, this.y);
    this.origin = new Vector(this.x, this.y);
    this.handleFriction = handleFriction;
    this.touchThreshold = touchThreshold;
    this.handleColor = handleColor;
    this.originColor = originColor;
  }

  private isTouchInsideJoystick(x: number, y: number): boolean {
    return this.origin.sub(new Vector(x, y)).mag() <= this.radius;
  }

  private reposition(
    controlActions: ControlActions,
    keys: DefaultKeys[]
  ): void {
    if (!controlActions.isTouch) {
      // Gradually return the handle to the center if not dragging
      this.cord = this.cord.add(
        this.origin.sub(this.cord).mul(this.handleFriction)
      );
      keys.length = 0;
    } else {
      // Limit the handle movement within the joystick radius
      const diff = this.touchCord.sub(this.origin);
      const maxDist = Math.min(diff.mag(), this.radius);
      this.cord = this.origin.add(diff.normalize().mul(maxDist));
    }
  }

  public update({
    controlActions,
    keys,
  }: {
    controlActions: ControlActions;
    keys: DefaultKeys[];
  }): void {
    if (!this.isMobileDevice()) return;

    this.reposition(controlActions, keys);

    if (!controlActions.isTouch) return;

    // reset the touch cord to the origin
    this.touchCord = this.origin;

    // if the touch is within the joystick radius
    if (
      this.isTouchInsideJoystick(
        controlActions.startCord.x,
        controlActions.startCord.y
      )
    ) {
      this.touchCord = new Vector(controlActions.x, controlActions.y);

      this.movementHandler(this.touchCord, keys);
    }
  }

  private addMovementKeys(
    keys: DefaultKeys[],
    {
      right = false,
      downRight = false,
      down = false,
      downLeft = false,
      left = false,
      upLeft = false,
      up = false,
      upRight = false,
    }
  ): void {
    // Add keys based on direction
    if (right) {
      if (!keys.includes(DefaultKeys.RIGHT)) keys.push(DefaultKeys.RIGHT);
    } else if (downRight) {
      if (!keys.includes(DefaultKeys.DOWN)) keys.push(DefaultKeys.DOWN);
      if (!keys.includes(DefaultKeys.RIGHT)) keys.push(DefaultKeys.RIGHT);
    } else if (down) {
      if (!keys.includes(DefaultKeys.DOWN)) keys.push(DefaultKeys.DOWN);
    } else if (downLeft) {
      if (!keys.includes(DefaultKeys.DOWN)) keys.push(DefaultKeys.DOWN);
      if (!keys.includes(DefaultKeys.LEFT)) keys.push(DefaultKeys.LEFT);
    } else if (left) {
      if (!keys.includes(DefaultKeys.LEFT)) keys.push(DefaultKeys.LEFT);
    } else if (upLeft) {
      if (!keys.includes(DefaultKeys.UP)) keys.push(DefaultKeys.UP);
      if (!keys.includes(DefaultKeys.LEFT)) keys.push(DefaultKeys.LEFT);
    } else if (up) {
      if (!keys.includes(DefaultKeys.UP)) keys.push(DefaultKeys.UP);
    } else if (upRight) {
      if (!keys.includes(DefaultKeys.UP)) keys.push(DefaultKeys.UP);
      if (!keys.includes(DefaultKeys.RIGHT)) keys.push(DefaultKeys.RIGHT);
    }
  }

  private removeMovementKeys(
    keys: DefaultKeys[],
    {
      right = false,
      downRight = false,
      down = false,
      downLeft = false,
      left = false,
      upLeft = false,
      up = false,
      upRight = false,
    }
  ): void {
    // Remove keys based on direction
    if (!right && !upRight && !downRight) {
      const index = keys.indexOf(DefaultKeys.RIGHT);
      if (index > -1) keys.splice(index, 1);
    }
    if (!downRight && !down && !downLeft) {
      const index = keys.indexOf(DefaultKeys.DOWN);
      if (index > -1) keys.splice(index, 1);
    }
    if (!down && !downLeft && !downRight) {
      const index = keys.indexOf(DefaultKeys.DOWN);
      if (index > -1) keys.splice(index, 1);
    }
    if (!downLeft && !left && !upLeft) {
      const index = keys.indexOf(DefaultKeys.LEFT);
      if (index > -1) keys.splice(index, 1);
    }
    if (!left && !upLeft && !downLeft) {
      const index = keys.indexOf(DefaultKeys.LEFT);
      if (index > -1) keys.splice(index, 1);
    }
    if (!upLeft && !up && !upRight) {
      const index = keys.indexOf(DefaultKeys.UP);
      if (index > -1) keys.splice(index, 1);
    }
    if (!up && !upRight && !upLeft) {
      const index = keys.indexOf(DefaultKeys.UP);
      if (index > -1) keys.splice(index, 1);
    }
    if (!upRight && !right && !downRight) {
      const index = keys.indexOf(DefaultKeys.RIGHT);
      if (index > -1) keys.splice(index, 1);
    }
  }

  private movementHandler(touchCord: Vector, keys: DefaultKeys[]): void {
    const diff = touchCord.sub(this.origin);

    if (diff.mag() < this.touchThreshold) return;

    const angle = diff.angle();

    const right = angle > -Math.PI / 8 && angle <= Math.PI / 8;
    const downRight = angle > Math.PI / 8 && angle <= (3 * Math.PI) / 8;
    const down = angle > (3 * Math.PI) / 8 && angle <= (5 * Math.PI) / 8;
    const downLeft = angle > (5 * Math.PI) / 8 && angle <= (7 * Math.PI) / 8;
    const left = angle > (7 * Math.PI) / 8 || angle <= (-7 * Math.PI) / 8;
    const upLeft = angle > (-7 * Math.PI) / 8 && angle <= (-5 * Math.PI) / 8;
    const up = angle > (-5 * Math.PI) / 8 && angle <= (-3 * Math.PI) / 8;
    const upRight = angle > (-3 * Math.PI) / 8 && angle <= -Math.PI / 8;

    this.addMovementKeys(keys, {
      right,
      downRight,
      down,
      downLeft,
      left,
      upLeft,
      up,
      upRight,
    });

    this.removeMovementKeys(keys, {
      right,
      downRight,
      down,
      downLeft,
      left,
      upLeft,
      up,
      upRight,
    });
  }

  private circle = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    radius: number,
    color: string
  ) => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  };

  public draw(ctx: CanvasRenderingContext2D): void {
    if (!this.isMobileDevice()) return;

    // Draw the joystick base
    this.circle(
      ctx,
      this.origin.x,
      this.origin.y,
      this.radius,
      this.originColor
    );

    // Draw the handle
    this.circle(
      ctx,
      this.cord.x,
      this.cord.y,
      this.handleRadius,
      this.handleColor
    );
  }
}

export default JoyStick;
