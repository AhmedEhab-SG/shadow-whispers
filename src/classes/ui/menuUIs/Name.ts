import UI from "../UI";

class Name extends UI {
  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();

    this.textX = gameWidth ? gameWidth * 0.5 - 210 : 0;
    this.textY = gameHeight ? gameHeight * 0.2 : 0;
    this.text = "Shadow Wispers";
    this.color = "white";
    this.shadowColor = "grey";
    this.fontSize = 70;
  }

  public update(): void {}
}

export default Name;
