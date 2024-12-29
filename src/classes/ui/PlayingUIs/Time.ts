import UI from "../UI";

class Time extends UI {
  private time = 0;
  private timeLimit: number;

  public constructor({
    gameWidth,
    timeLimit,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
    timeLimit?: number;
  }) {
    super();
    this.timeLimit = timeLimit || 0;
    this.textX = gameWidth ? gameWidth * 0.8 - 50 : 0;
    this.textY = gameHeight ? gameHeight * 0.05 : 0;
  }

  public update({ deltaTime }: { deltaTime: number }): void {
    this.time += deltaTime;
    this.text = `Time: ${this.formatTime(
      Math.floor(this.time * 0.001)
    )}/${this.formatTime(this.timeLimit * 0.001)}`;
  }
}

export default Time;
