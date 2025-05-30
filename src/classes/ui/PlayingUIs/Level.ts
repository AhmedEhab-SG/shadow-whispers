import UI from "../UI";

class Level extends UI {
  private gameWidth?: number;

  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();
    this.textX = 15;
    this.text = "Level: 0";
    this.gameWidth = gameWidth;
    this.textY = gameHeight ? gameHeight * 0.05 : 0;
  }

  public update({ level }: { level: number }): void {
    this.text = `Level: ${level.toFixed(0)}`;
    this.textX = this.gameWidth
      ? this.gameWidth * 0.5 - this.textWidth * 0.5
      : 0;
  }
}

export default Level;
