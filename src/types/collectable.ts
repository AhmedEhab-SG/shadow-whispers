import Collectables from "../classes/collectables";

type CollectableInstance = InstanceType<
  (typeof Collectables.CollectableTypes)[number]
>;

export type { CollectableInstance };
