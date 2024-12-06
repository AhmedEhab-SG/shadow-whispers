import { DefaultControlsType } from "../config/DefaultControls";
import BaseKeys from "../enum/BaseKeys";

class ControlKeys extends Event {
  private _keys: BaseKeys[] = [];
  public _key: BaseKeys | "" = "";

  constructor(
    private defaultControls: DefaultControlsType,
    public debugMode: boolean
  ) {
    super("controlKeys");
  }

  public addHandlers(): void {
    window.addEventListener("keydown", this.keydownHandler);
    window.addEventListener("keyup", this.keyupHandler);
  }

  public removeHandlers(): void {
    window.removeEventListener("keydown", this.keydownHandler);
    window.removeEventListener("keyup", this.keyupHandler);
  }

  private keydownHandler = (e: KeyboardEvent): void => {
    for (const [action, keys] of this.defaultControls.map.entries()) {
      if (keys.includes(e.code) && !this.keys.includes(action)) {
        this.keys.push(action);
        this._key = action;
        if (action === BaseKeys.DEBUG) this.debugMode = !this.debugMode;
      }
    }
  };

  private keyupHandler = (e: KeyboardEvent): void => {
    this._key = "";
    for (const [action, keys] of this.defaultControls.map.entries()) {
      if (keys.includes(e.code)) {
        this._keys = this.keys.filter((key) => key !== action);
      }
    }
  };

  // Setter and Getter
  get keys(): BaseKeys[] {
    return this._keys;
  }

  get key(): BaseKeys | "" {
    return this._key;
  }
}

export default ControlKeys;
