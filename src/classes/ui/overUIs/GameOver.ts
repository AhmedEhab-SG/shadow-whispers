import UI from "../UI";

class GameOver extends UI {
  private gameWidth?: number;
  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();

    this.text = "Game Over";
    this.gameWidth = gameWidth;
    this.textY = gameHeight ? gameHeight * 0.25 : 0;
    this.fontSize = 70;
    this.color = "rgb(168, 0, 0)";
    this.shadowColor = "rgb(0,0,0)";
  }

  public update({}): void {
    this.textX = this.gameWidth
      ? this.gameWidth * 0.5 - this.textWidth * 0.5
      : 0;
  }
}

export default GameOver;
