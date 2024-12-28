import Backgrounds from "../../classes/backgrounds";
import UI from "../../classes/ui";
import GameStatus from "../../config/GameStatus";
import IDrawable from "../../interfaces/IDrawable";
import { ControlActions } from "../../types/events";
import { GameStates } from "../../types/game";
import { OverUIInstance } from "../../types/ui";
import Interval from "../../utils/Interval";
import BackgroundsEnum from "../../enum/Backgrounds";

class Over extends Interval implements IDrawable {
  private backgrounds: Backgrounds;
  private ui: OverUIInstance[] = [];

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
    }).getAllOverUIs();
  }

  public update({ controlActions }: { controlActions: ControlActions }): void {
    if (this.gameStates.status !== GameStatus.OVER) return;

    // update each UI
    this.ui.forEach((ui) =>
      ui.update({
        controlActions,
        gameStates: this.gameStates,
      })
    );
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    if (this.gameStates.status !== GameStatus.OVER) return;

    // Draw background
    this.backgrounds
      .getBackgroundsByName(BackgroundsEnum.TRNASPARENT)

      .draw(ctx);
    // Draw UI
    this.ui.forEach((ui) => ui.draw(ctx));
  }
}

export default Over;
