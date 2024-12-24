import UI from "../UI";

class Energy extends UI {
  public constructor({ gameHeight }: { gameHeight?: number }) {
    super();
    this.textX = 15;
    this.text = "Energy: 0";
    this.textY = gameHeight ? gameHeight * 0.05 + 30 : 0;
  }

  public update({ hero }: { hero: { energy: number } }): void {
    this.text = `Energy: ${hero.energy.toFixed(0)}`;
  }
}

export default Energy;
