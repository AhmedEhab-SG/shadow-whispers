import UI from "../UI";

class Controls extends UI {
  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();

    this.textX = gameWidth ? gameWidth * 0.01 : 0;
    this.textY = gameHeight ? gameHeight * 0.99 : 0;
    this.text = `Controls: 🡱🡰🡲🡳 or WASD to move, 𓈙 Space to Attack `;
    this.color = "white";
    this.shadowColor = "black";
    this.fontSize = 20;
    this.fontFamily = "Bangers, cursive";
  }

  public update(): void {}
}

export default Controls;
