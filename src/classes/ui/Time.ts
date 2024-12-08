import UI from "./UI";

class Time extends UI {
  private time = 0;
  private timeLimit: number;

  public constructor({
    gameWidth,
    timeLimit,
  }: {
    gameWidth?: number;
    timeLimit: number;
  }) {
    super();
    this.timeLimit = timeLimit;
    this.textX = gameWidth ? gameWidth * 0.75 - 50 : 0;
    this.textY = 35;
  }

  private getTime(time: number, maxTime: number): string {
    return `${(time * 0.001).toFixed(1)}/${(maxTime * 0.001).toFixed(0)}`;
  }

  public update({ deltaTime }: { deltaTime: number }): void {
    this.time += deltaTime;
    this.text = `Time: ${this.getTime(this.time, this.timeLimit)}`;
  }
}

export default Time;
