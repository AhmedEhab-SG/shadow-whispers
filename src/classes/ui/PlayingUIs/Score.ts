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
    this.textX = gameWidth ? gameWidth * 0.25 : 0;
    this.textY = gameHeight ? gameHeight * 0.05 : 0;
  }

  public update({ score }: { score: number }): void {
    this.text = `Score: ${score.toFixed(0)}`;
  }
}

export default Score;
