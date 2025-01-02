import Backgrounds from "../../classes/backgrounds";
import UI from "../../classes/ui";
import GameStatus from "../../config/GameStatus";
import IDrawable from "../../interfaces/IDrawable";
import { ControlActions } from "../../types/events";
import { GameStates } from "../../types/game";
import { PauseUIInstance } from "../../types/ui";
import Interval from "../../utils/Interval";
import BackgroundsEnum from "../../enum/Backgrounds";

class Pause extends Interval implements IDrawable {
  private backgrounds: Backgrounds;
  private ui: PauseUIInstance[] = [];

  public constructor(
    private width: number,
    private height: number,
    public gameStates: GameStates
  ) {
    super();

    this.backgrounds = new Backgrounds(this.width, this.height);

    this.ui = new UI({
      gameWidth: this.width,
      gameHeight: this.height,
    }).getAllPauseUI();
  }

  public update({ controlActions }: { controlActions: ControlActions }): void {
    if (this.gameStates.status !== GameStatus.PAUSED) return;

    // update each UI
    this.ui.forEach((ui) =>
      ui.update({
        controlActions,
        gameStates: this.gameStates,
      })
    );
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    if (this.gameStates.status !== GameStatus.PAUSED) return;

    // Draw background
    this.backgrounds
      .getBackgroundsByName(BackgroundsEnum.TRNASPARENT)

      .draw(ctx);
    // Draw UI
    this.ui.forEach((ui) => ui.draw(ctx));
  }
}

export default Pause;
