import { EnemyObj } from "../../../types/enemy";
import Enemy from "./Enemy";

abstract class ClimbingEnemy extends Enemy {
  constructor(
    protected enemyObj: EnemyObj,
    protected gameWidth: number,
    protected gameHeight: number,
    protected enviGroundMargin: number
  ) {
    super(enemyObj);

    this.x = this.gameWidth * 0.5;
    this.y = 0;

    this.vx = 0;
    this.vy = 1;
  }

  public update({
    deltaTime,
    gameSpeed,
  }: {
    deltaTime: number;
    gameSpeed: number;
  }): void {
    super.update({ deltaTime, gameSpeed });

    // reverse direction when hit the grodfund
    if (this.y > this.gameHeight - this.height - this.enviGroundMargin)
      this.vy = -1;

    // delete when out of screen on top
    if (this.y < -this.height) this.destroy();
  }

  public draw(ctx: CanvasRenderingContext2D, debugMode: boolean): void {
    ctx.beginPath();
    ctx.moveTo(this.x + this.enemyObj.frame.width * 0.5 * this.sizeScale, 0);
    ctx.lineTo(
      this.x + this.enemyObj.frame.width * 0.5 * this.sizeScale,
      this.y + this.enemyObj.frame.height * this.sizeScale * 0.5
    );
    ctx.stroke();

    super.draw(ctx, debugMode);
  }
}

export default ClimbingEnemy;
