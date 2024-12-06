import BaseKeys from "../enum/BaseKeys";

class DefaultControls {
  static controls: [BaseKeys, string[]][] = [
    [BaseKeys.RIGHT, ["ArrowRight", "KeyD"]],
    [BaseKeys.LEFT, ["ArrowLeft", "KeyA"]],
    [BaseKeys.UP, ["ArrowUp", "KeyW"]],
    [BaseKeys.DOWN, ["ArrowDown", "KeyS"]],
    [BaseKeys.ACTION, ["Space"]],
    [BaseKeys.DEBUG, ["KeyP"]],
  ];

  static map = new Map<BaseKeys, string[]>(DefaultControls.controls);
}

type DefaultControlsType = typeof DefaultControls;

export type { DefaultControlsType };
export default DefaultControls;
