import Restart from "../overUIs/Restart";

class RestartPS extends Restart {
  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super({ gameWidth, gameHeight });

    this.textY = gameHeight ? gameHeight * 0.55 : 0;
    this.fontSize = 30;
  }
}

export default RestartPS;
