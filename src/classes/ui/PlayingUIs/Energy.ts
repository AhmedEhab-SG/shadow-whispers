import UI from "../UI";
import fireImg from "../../../assets/imgs/vfx/fire.png";

class Energy extends UI {
  public constructor({ gameHeight }: { gameHeight?: number }) {
    super();
    this.textX = 15;
    this.text = "Energy: 0";
    this.textY = gameHeight ? gameHeight * 0.05 + 30 : 0;
    this.imgSize = 40;
    this.imgY = this.textY - this.imgSize + 5;
    this.loadImage(fireImg);
    this.drawImg = true;
  }

  public update({ hero }: { hero: { energy: number } }): void {
    this.text = `Energy: ${hero.energy.toFixed(0)}`;
    if (hero.energy < 20) {
      this.color = "rgb(168, 0, 0)";
    } else {
      this.color = "rgb(0, 0, 0)";
    }
    this.imgX = this.textX + this.textWidth ;
  }
}

export default Energy;
