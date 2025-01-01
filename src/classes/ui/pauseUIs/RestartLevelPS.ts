import RestartLevel from "../overUIs/RestartLevel";

class RestartLevelPS extends RestartLevel {
  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super({ gameWidth, gameHeight });

    this.textX = gameWidth ? gameWidth * 0.435 : 0;
    this.textY = gameHeight ? gameHeight * 0.55 : 0;
  }
}

export default RestartLevelPS;
