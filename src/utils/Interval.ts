abstract class Interval {
  private _lastTime = 0;

  protected runInterval(
    fun: (deltaTime: number) => void,
    condition = true,
    timeStamp = performance.now()
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
}

export default Interval;
