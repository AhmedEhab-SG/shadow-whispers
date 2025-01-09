import UI from "../UI";

class Score extends UI {
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
    this.textY = gameHeight ? gameHeight * 0.05 + 30 : 0;
  }

  public update({
    score,
    scorePerLevel,
  }: {
    score: number;
    scorePerLevel: number;
  }): void {
    this.text = `Score: ${score.toFixed(0)}/${scorePerLevel.toFixed(0)}`;

    this.textX = this.gameWidth
      ? this.gameWidth * 0.3 - this.textWidth * 0.5
      : 0;
  }
}

export default Score;
