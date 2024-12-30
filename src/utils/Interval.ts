abstract class Interval {
  private _lastTime = 0;

  protected runInterval(
    fun: (deltaTime: number) => void,
    condition = true,
    timeStamp = 0
  ): void {
    let deltaTime = timeStamp - this._lastTime;
    this._lastTime = timeStamp;

    fun(deltaTime);

    if (condition)
      requestAnimationFrame((timeStamp) =>
        this.runInterval(fun, condition, timeStamp)
      );
  }

  protected runConstInterval(
    fun: () => void,
    deltaTime: number,
    timerRef: { timer: number },
    { interval = 1000, fps = 1 } = {}
  ): void {
    if (timerRef.timer > interval / fps) {
      fun();
      timerRef.timer = 0;
    } else {
      timerRef.timer += deltaTime;
    }
  }

  protected formatTime(seconds: number): string {
    if (seconds <= 0) return "00:00";

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds =
      remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    if (hours) return `${hours}:${formattedMinutes}:${formattedSeconds}`;

    return `${formattedMinutes}:${formattedSeconds}`;
  }
}

export default Interval;
