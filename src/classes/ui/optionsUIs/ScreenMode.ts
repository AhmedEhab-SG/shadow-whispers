import UI from "../UI";

class ScreenMode extends UI {
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
    this.text = "Screen Mode:";
    this.color = "white";
    this.shadowColor = "grey";
    this.fontSize = 45;
    this.fontFamily = "Bangers, cursive";
  }

  public update({}: {}): void {}
}

export default ScreenMode;
