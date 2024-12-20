import UI from "../classes/ui";

type InGameUIInstance = InstanceType<(typeof UI.InGameUIs)[number]>;

type MenuUIInstance = InstanceType<(typeof UI.MenuUIs)[number]>;

export type { InGameUIInstance, MenuUIInstance };
