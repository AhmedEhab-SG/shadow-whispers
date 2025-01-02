import GameStatus from "../config/GameStatus";
import AspectRatio from "../enum/AspectRatio";

type GameStates = {
  status: GameStatus;
  debugMode: boolean;
  aspectRatio: AspectRatio;
};

export type { GameStates };
