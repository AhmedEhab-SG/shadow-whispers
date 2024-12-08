import UI from "./UI";

class Score extends UI {
  public constructor({ gameWidth }: { gameWidth?: number }) {
    super();
    this.textX = gameWidth ? gameWidth * 0.25 : 0;
    this.textY = 30;
  }

  public update({ hero }: { hero: { score: number } }): void {
    this.text = `Score: ${hero.score.toFixed(0)}`;
  }
}

export default Score;
