import UI from "../classes/ui";

type PlayingUIInstance = InstanceType<(typeof UI.PlayingUIs)[number]>;

type MenuUIInstance = InstanceType<(typeof UI.MenuUIs)[number]>;

type PauseUIInstance = InstanceType<(typeof UI.PauseUI)[number]>;

type OverUIInstance = InstanceType<(typeof UI.OverUIs)[number]>;

export type {
  PlayingUIInstance,
  MenuUIInstance,
  PauseUIInstance,
  OverUIInstance,
};
