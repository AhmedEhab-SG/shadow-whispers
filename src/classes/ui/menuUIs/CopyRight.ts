import { ControlActions } from "../../../types/events";
import logoImg from "../../../assets/imgs/ui/logo.png";
import UI from "../UI";
import { GameStates } from "../../../types/game";
import { GameSave } from "../../../types/save";

class CopyRight extends UI {
  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
    gameSave?: GameSave | null;
  }) {
    super();
    this.textX = gameWidth ? gameWidth * 0.875 : 0;
    this.textY = gameHeight ? gameHeight * 0.985 : 0;
    this.text = "Ahmed Ehab SG";
    this.fontFamily = "Arial";
    this.fontWeight = "bold";
    this.fontSize = 18;
    this.imgSize = 28;

    this.imgY = this.textY - this.imgSize + 6;
    this.loadImage(logoImg);
    this.drawImg = true;
  }

  public update({
    controlActions,
  }: {
    controlActions: ControlActions;
    gameStates: GameStates;
  }): void {
    this.imgX = this.textX - this.imgSize - 8;
    if (this.isHover(controlActions)) {
      this.color = "white";
      this.shadowColor = "none";

      this.click(controlActions, () =>
        window.open("https://ahmedehab-sg.com/", "_blank")
      );
    } else {
      this.color = "rgb(136, 136, 255)";
      this.shadowColor = "none";
    }
  }
}

export default CopyRight;
