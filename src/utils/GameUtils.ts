import Interval from "./Interval";

abstract class GameUtils extends Interval {
  protected abstract update({ deltaTime }: { deltaTime: number }): void;
  protected abstract draw(): void;
}

export default GameUtils;
