import UI from "../UI";

class Time extends UI {
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
    this.textY = gameHeight ? gameHeight * 0.05 : 0;
  }

  public update({
    time,
    timeLimit,
  }: {
    time: number;
    timeLimit: number;
  }): void {
    this.text = `Time: ${this.formatTime(time * 0.001)}/${this.formatTime(
      timeLimit * 0.001
    )}`;

    if (time + 30 * 1000 >= timeLimit) this.color = "rgb(168, 0, 0)";
    else this.color = "rgb(0, 0, 0)";

    this.textX = this.gameWidth ? this.gameWidth - 15 - this.textWidth : 0;
  }
}

export default Time;
