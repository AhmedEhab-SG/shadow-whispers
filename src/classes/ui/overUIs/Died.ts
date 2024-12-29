import UI from "../UI";

class Died extends UI {
  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();

    this.text = "You Died";
    this.textX = gameWidth ? gameWidth * 0.5 - 110 : 0;
    this.textY = gameHeight ? gameHeight * 0.35 : 0;
    this.fontSize = 60;
    this.color = "rgb(168, 0, 0)";
    this.shadowColor = "rgb(0,0,0)";
  }

  public update({}): void {}
}

export default Died;
