import UI from "../UI";

class MobileControls extends UI {
  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();

    this.textX = gameWidth ? gameWidth * 0.26 : 0;
    this.textY = gameHeight ? gameHeight * 0.69 : 0;
    this.text = "🕹️ or 🖱️ to move, 🕹️ or 🖱️ on Attack Button to Attack";
    this.color = "white";
    this.shadowColor = "grey";
    this.fontSize = 30;
    this.fontFamily = "Inter";
  }
  public update(): void {}
}

export default MobileControls;
