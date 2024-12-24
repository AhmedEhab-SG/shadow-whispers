import DefaultKeys from "../enum/BaseKeys";
import { ControlActions } from "../types/events";
import { GameStates } from "../types/game";

interface IDrawable {
  update({}: {
    deltaTime: number;
    keys: DefaultKeys[];
    controlActions: ControlActions;
    gameSpeed: number;
    gameStatus: GameStates;
  }): void;
  draw(ctx: CanvasRenderingContext2D, debugMode?: boolean): void;
}

export default IDrawable;
