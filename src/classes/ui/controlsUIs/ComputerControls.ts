import UI from "../UI";

class ComputerControls extends UI {
  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();

    this.textX = gameWidth ? gameWidth * 0.3 : 0;
    this.textY = gameHeight ? gameHeight * 0.545 : 0;
    this.text = "🡱🡰🡲🡳 or WASD to move, 𓈙 Space to Attack";
    this.color = "white";
    this.shadowColor = "grey";
    this.fontSize = 30;
    this.fontFamily = "Arial";
  }
  public update({}: {}): void {}
}

export default ComputerControls;
