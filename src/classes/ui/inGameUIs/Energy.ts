import UI from "../UI";

class Energy extends UI {
  public constructor() {
    super();
    this.textX = 15;
    this.textY = 65;
  }

  public update({ hero }: { hero: { energy: number } }): void {
    this.text = `Energy: ${hero.energy.toFixed(0)}`;
  }
}

export default Energy;
