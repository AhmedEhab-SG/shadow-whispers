import UI from "../UI";
import DefaultKeys from "../../../enum/BaseKeys";
import { ControlActions } from "../../../types/events";

class Attack extends UI {
  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();

    this.text = "Attack";
    this.textX = gameWidth ? gameWidth - 70 - 100 : 0;
    this.textY = gameHeight ? gameHeight - 70 : 0;
    this.fontSize = 30;
    this.fontFamily = "Bangers, cursive";
  }

  public update({
    keys,
    controlActions,
  }: {
    keys: DefaultKeys[];
    controlActions: ControlActions;
  }): void {
    if (this.isHover(controlActions)) {
      this.color = "gray";
      this.shadowColor = "white";

      if (this.isClicked(controlActions) || this.isHold(controlActions)) {
        this.color = "black";
        this.shadowColor = "white";

        if (!keys.includes(DefaultKeys.ACTION)) keys.push(DefaultKeys.ACTION);
      }
    } else {
      this.color = "white";
      this.shadowColor = "black";

      if (keys.includes(DefaultKeys.ACTION)) {
        keys.splice(keys.indexOf(DefaultKeys.ACTION), 1);
      }
    }
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    super.draw(ctx);
  }
}

export default Attack;
