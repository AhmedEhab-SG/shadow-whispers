import { ControlActions } from "../../../types/events";
import logoImg from "../../../assets/imgs/ui/logo.png";
import UI from "../UI";
import { GameStates } from "../../../types/game";

class CopyRight extends UI {
  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();
    this.textX = gameWidth ? gameWidth * 0.85 : 0;
    this.textY = gameHeight ? gameHeight * 0.985 : 0;
    this.text = "Ahmed Ehab SG";
    this.fontFamily = "Inter";
    this.fontWeight = "bold";
    this.fontStyle = "italic";
    this.fontSize = 20;
    this.imgSize = 30;
    this.imgX = this.textX - this.imgSize - 5;
    this.imgY = this.textY - this.imgSize + 5;
    this.loadImage(logoImg);
    this.drawImg = true;
  }

  public update({
    controlActions,
  }: {
    controlActions: ControlActions;
    gameStates: GameStates;
  }): void {
    if (this.isHover(controlActions)) {
      this.color = "white";
      this.shadowColor = "none";

      this.click(controlActions, () => {
        this.color = "grey";
        this.shadowColor = "none";
        window.open("https://ahmedehab-sg.com/", "_blank");
      });
    } else {
      this.color = "rgb(136, 136, 255)";
      this.shadowColor = "none";
    }
  }
}

export default CopyRight;
