import UI from "../classes/ui";

type InGameUIInstance = InstanceType<(typeof UI.InGameUIs)[number]>;

type MenuUIInstance = InstanceType<(typeof UI.MenuUIs)[number]>;

type PauseUIInstance = InstanceType<(typeof UI.PauseUI)[number]>;

export type { InGameUIInstance, MenuUIInstance, PauseUIInstance };
