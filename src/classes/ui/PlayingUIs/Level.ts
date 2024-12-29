import UI from "../UI";

class Level extends UI {
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
    this.textX = gameWidth ? gameWidth * 0.45 : 0;
    this.textY = gameHeight ? gameHeight * 0.05 : 0;
  }

  public update({ level }: { level: number }): void {
    this.text = `Level: ${level.toFixed(0)}`;
  }
}

export default Level;
