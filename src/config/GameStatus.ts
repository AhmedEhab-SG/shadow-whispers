class GameStatus {
  public static readonly MENU = "menu";
  public static readonly OPTIONS = "options";
  public static readonly PLAYING = "playing";
  public static readonly PAUSED = "paused";
  public static readonly RESTART = "Restart";
  public static readonly RESTART_LEVEL = "restartLevel";
  public static readonly NEXT = "next";
  public static readonly TIMES_UP = "timesUp";
  public static readonly OVER = "over";
}

type GameStatusType = typeof GameStatus;

export type { GameStatusType };
export default GameStatus;
