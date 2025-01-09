import UI from "../UI";

class Name extends UI {
  private gameWidth?: number;

  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();

    this.gameWidth = gameWidth;
    this.textY = gameHeight ? gameHeight * 0.2 : 0;
    this.text = "Shadow Wispers";
    this.color = "white";
    this.shadowColor = "grey";
    this.fontSize = 70;
  }

  public update(): void {
    this.textX = this.gameWidth
      ? this.gameWidth * 0.5 - this.textWidth * 0.5
      : 0;
  }
}

export default Name;
