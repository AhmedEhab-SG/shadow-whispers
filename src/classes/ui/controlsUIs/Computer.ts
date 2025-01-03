import UI from "../UI";

class Computer extends UI {
  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();

    this.textX = gameWidth ? gameWidth * 0.15 : 0;
    this.textY = gameHeight ? gameHeight * 0.55 : 0;
    this.text = "Computer:";
    this.color = "white";
    this.shadowColor = "grey";
    this.fontSize = 45;
    this.fontFamily = "Bangers, cursive";
  }

  public update({}: {}): void {}
}

export default Computer;
