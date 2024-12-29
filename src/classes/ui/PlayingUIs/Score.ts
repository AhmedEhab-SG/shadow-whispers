import UI from "../UI";

class Score extends UI {
  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();
    this.textX = gameWidth ? gameWidth * 0.27 : 0;
    this.textY = gameHeight ? gameHeight * 0.05 : 0;
  }

  public update({
    score,
    scorePerLevel,
  }: {
    score: number;
    scorePerLevel: number;
  }): void {
    this.text = `Score: ${score.toFixed(0)}/${scorePerLevel.toFixed(0)}`;
  }
}

export default Score;
