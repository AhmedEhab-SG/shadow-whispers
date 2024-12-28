import UI from "../UI";

class GameOver extends UI {
  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();

    this.text = "Game Over";
    this.textX = gameWidth ? gameWidth * 0.5 - 150 : 0;
    this.textY = gameHeight ? gameHeight * 0.25 : 0;
    this.fontSize = 70;
    this.color = "rgb(168, 0, 0)";
    this.shdowColor = "rgb(0,0,0)";
  }

  public update({}): void {}
}

export default GameOver;
