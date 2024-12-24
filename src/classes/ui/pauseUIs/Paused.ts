import UI from "../UI";

class Paused extends UI {
  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();

    this.text = "Paused";
    this.textX = gameWidth ? gameWidth * 0.5 - 100 : 0;
    this.textY = gameHeight ? gameHeight * 0.25 : 0;
    this.fontSize = 70;
  }

  public update({}): void {}
}

export default Paused;
