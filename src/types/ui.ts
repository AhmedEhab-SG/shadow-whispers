import UI from "../classes/ui";

type PlayingUIInstance = InstanceType<(typeof UI.PlayingUIs)[number]>;

type MenuUIInstance = InstanceType<(typeof UI.MenuUIs)[number]>;

type OptionsUIInstance = InstanceType<(typeof UI.OptionsUIs)[number]>;

type ControlsUIInstance = InstanceType<(typeof UI.ControlsUIs)[number]>;

type PauseUIInstance = InstanceType<(typeof UI.PauseUI)[number]>;

type OverUIInstance = InstanceType<(typeof UI.OverUIs)[number]>;

type NextUIInstance = InstanceType<(typeof UI.NextUIs)[number]>;

type MobileUIInstance = InstanceType<(typeof UI.MobileUIs)[number]>;

export type {
  PlayingUIInstance,
  OptionsUIInstance,
  MenuUIInstance,
  PauseUIInstance,
  OverUIInstance,
  NextUIInstance,
  MobileUIInstance,
  ControlsUIInstance,
};
