import UI from "../UI";

class HightScore extends UI {
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
    this.textY = gameHeight ? gameHeight * 0.05 : 0;
  }

  public update({ highScore }: { highScore: number }): void {
    this.text = `HightScore: ${highScore.toFixed(0)}`;

    this.textX = this.gameWidth
      ? this.gameWidth * 0.3 - this.textWidth * 0.5
      : 0;
  }
}

export default HightScore;
