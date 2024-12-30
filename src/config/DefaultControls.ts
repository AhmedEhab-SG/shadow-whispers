import BaseKeys from "../enum/BaseKeys";

class DefaultControls {
  public static controls: [BaseKeys, string[]][] = [
    [BaseKeys.RIGHT, ["ArrowRight", "KeyD"]],
    [BaseKeys.LEFT, ["ArrowLeft", "KeyA"]],
    [BaseKeys.UP, ["ArrowUp", "KeyW"]],
    [BaseKeys.DOWN, ["ArrowDown", "KeyS"]],
    [BaseKeys.ACTION, ["Space"]],
    [BaseKeys.DEBUG, ["KeyP"]],
    [BaseKeys.ESC, ["Escape"]],
  ];

  public static map = new Map<BaseKeys, string[]>(DefaultControls.controls);
}

type DefaultControlsType = typeof DefaultControls;

export type { DefaultControlsType };
export default DefaultControls;
