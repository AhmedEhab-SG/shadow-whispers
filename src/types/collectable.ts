import Collectables from "../classes/collectables";
import CollectablesEnum from "../enum/Collectables";

type CollectableObj = {
  id: number;
  name: CollectablesEnum;
  image: string
  effectMessage: string;
  size: number;
  effectNumber: number;
};

type CollectableInstance = InstanceType<
  (typeof Collectables.CollectableTypes)[number]
>;

export type { CollectableInstance, CollectableObj };
