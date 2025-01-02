import UI from "../UI";
import { ControlActions } from "../../../types/events";
import { GameStates } from "../../../types/game";
import GameStatus from "../../../config/GameStatus";

class FullScreen extends UI {
  private gameWidth?: number;
  private canvas?: HTMLCanvasElement;

  public constructor({
    canvas,
    gameWidth,
    gameHeight,
  }: {
    canvas?: HTMLCanvasElement;
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super(); // Call the super constructor without arguments

    this.canvas = canvas;
    this.gameWidth = gameWidth;
    this.text = "Full Screen";
    this.textX = gameWidth ? gameWidth * 0.5 - 72 : 0;
    this.textY = gameHeight ? gameHeight * 0.75 : 0;
    this.fontSize = 30;
    this.fontFamily = "Bangers, cursive";
  }

  public update({
    controlActions,
    gameStates,
  }: {
    controlActions: ControlActions;
    gameStates: GameStates;
  }): void {
    if (document.fullscreenElement) {
      this.text = "Exit Full Screen";
      this.textX = this.gameWidth ? this.gameWidth * 0.5 - 95 : 0;
    } else {
      this.text = "Full Screen";
      this.textX = this.gameWidth ? this.gameWidth * 0.5 - 72 : 0;
    }

    if (this.isHover(controlActions)) {
      this.color = "white";
      this.shadowColor = "black";

      if (this.isClicked(controlActions)) {
        this.color = "grey";
        this.shadowColor = "black";

        if (document.fullscreenElement) {
          document
            .exitFullscreen()
            .catch((err) =>
              console.log(
                "Error attempting to exit full-screen mode:",
                err.message
              )
            );
        } else {
          this.canvas
            ?.requestFullscreen()
            .then(() => {
              gameStates.status = GameStatus.PLAYING;
            })
            .catch((err) =>
              console.log(
                "Error attempting to enable full-screen mode:",
                err.message
              )
            );
        }
      }
    } else {
      this.color = "black";
      this.shadowColor = "white";
    }
  }
}

export default FullScreen;
