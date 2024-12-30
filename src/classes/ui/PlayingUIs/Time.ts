import UI from "../UI";

class Time extends UI {
  public constructor({
    gameWidth,

    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();

    this.textX = gameWidth ? gameWidth * 0.8 - 50 : 0;
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

    if (time + 30 * 1000 >= timeLimit) {
      this.color = "rgb(168, 0, 0)";
    } else {
      this.color = "rgb(0, 0, 0)";
    }
  }
}

export default Time;
