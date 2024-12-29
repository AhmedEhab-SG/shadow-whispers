import UI from "../UI";

class Win extends UI {
  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();

    this.text = "You Beat This Level!";
    this.textX = gameWidth ? gameWidth * 0.3 : 0;
    this.textY = gameHeight ? gameHeight * 0.25 : 0;
    this.fontSize = 70;
    this.color = "rgb(50,205,50)";
    this.shadowColor = "black";
  }

  public update({}): void {}
}

export default Win;
