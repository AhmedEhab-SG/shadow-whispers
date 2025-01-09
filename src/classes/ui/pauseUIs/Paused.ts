import UI from "../UI";

class Paused extends UI {
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
    this.textY = gameHeight ? gameHeight * 0.25 : 0;
    this.text = "Paused";
    this.fontSize = 70;
  }

  public update({}): void {
    this.textX = this.gameWidth
      ? this.gameWidth * 0.5 - this.textWidth * 0.5
      : 0;
  }
}

export default Paused;
