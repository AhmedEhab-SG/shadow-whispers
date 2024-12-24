import Backgrounds from "../classes/backgrounds";

type BackgroundInstance = InstanceType<
  (typeof Backgrounds.backgrounds)[number]
>;

export type { BackgroundInstance };
