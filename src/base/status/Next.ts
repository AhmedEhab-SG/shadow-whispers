import Backgrounds from "../../classes/backgrounds";
import UI from "../../classes/ui";
import GameStatus from "../../config/GameStatus";
import IDrawable from "../../interfaces/IDrawable";
import { ControlActions } from "../../types/events";
import { GameStates } from "../../types/game";
import { NextUIInstance } from "../../types/ui";
import Interval from "../../utils/Interval";
import BackgroundsEnum from "../../enum/Backgrounds";

class Next extends Interval implements IDrawable {
  private backgrounds: Backgrounds;
  private ui: NextUIInstance[] = [];

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
    }).getAllNextUIs();
  }

  public update({ controlActions }: { controlActions: ControlActions }): void {
    if (this.gameStates.status !== GameStatus.NEXT) return;

    // update each UI
    this.ui.forEach((ui) =>
      ui.update({
        controlActions,
        gameStates: this.gameStates,
      })
    );
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    if (this.gameStates.status !== GameStatus.NEXT) return;

    // Draw background
    this.backgrounds
      .getBackgroundsByName(BackgroundsEnum.TRNASPARENT, {
        color: "rgba(0, 0, 0, 0.25)",
      })

      .draw(ctx);
    // Draw UI
    this.ui.forEach((ui) => ui.draw(ctx));
  }
}

export default Next;
