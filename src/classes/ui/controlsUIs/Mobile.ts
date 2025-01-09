import UI from "../UI";

class Mobile extends UI {
  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();

    this.textX = gameWidth ? gameWidth * 0.15 : 0;
    this.textY = gameHeight ? gameHeight * 0.7 : 0;
    this.text = "Mobile:";
    this.color = "white";
    this.shadowColor = "grey";
    this.fontSize = 40;
    this.fontFamily = "Bangers, cursive";
  }

  public update({}: {}): void {}
}

export default Mobile;
