import { GameSave } from "../types/save";
import LocalStorage from "../utils/LocalStorage";

class Save extends LocalStorage {
  private readonly key: string = "shadow-whispers-save";

  public saveGame(gameSave: GameSave) {
    this.setItem(this.key, gameSave);
  }

  public loadGame() {
    return this.getItem(this.key) as GameSave | null;
  }
}

export default Save;
