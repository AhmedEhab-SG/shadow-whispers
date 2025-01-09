import UI from "../UI";

class Win extends UI {
  private gameWidth?: number;

  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();

    this.text = "You Beat This Level!";
    this.gameWidth = gameWidth;
    this.textY = gameHeight ? gameHeight * 0.25 : 0;
    this.fontSize = 70;
    this.color = "rgb(50,205,50)";
    this.shadowColor = "black";
  }

  public update({}): void {
    this.textX = this.gameWidth
      ? this.gameWidth * 0.5 - this.textWidth * 0.5
      : 0;
  }
}

export default Win;
