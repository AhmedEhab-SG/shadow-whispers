import UI from "../UI";

class ProTip extends UI {
  public constructor({
    gameWidth,
    gameHeight,
  }: {
    gameWidth?: number;
    gameHeight?: number;
  }) {
    super();
    this.textX = gameWidth ? gameWidth * 0.03 : 0;
    this.textY = gameHeight ? gameHeight * 0.950 : 0;
    this.text =
      "Pro Tip: In Mobile Devices, Play in fullscreen mode from options and rotate your device or,";
    this.color = "white";
    this.shadowColor = "grey";
    this.fontSize = 16;
    this.fontFamily = "Arial";
    this.fontWeight = "bold";
    this.fontStyle = "italic";
  }

  public update(): void {}
}

export default ProTip;
