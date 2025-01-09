import Environments from "../enum/Environments";
import Heroes from "../enum/Heroes";

type GameSave = {
  progress: {
    level: number;
    highScore: number;
    lives: number;
  };

  environment: {
    name: Environments;
  };

  hero: {
    name: Heroes;
  };
};

export type { GameSave };
