import Environments from "../classes/environments";
import EnvironmentsEnum from "../enum/Environments";

type Layer = {
  image: string;
  speed: number;
};

type EnvironmentObj = {
  id: number;
  name: EnvironmentsEnum;
  width: number;
  height: number;
  jumpHeight: number;
  groundMargin: number;
  gravity: number;
  layers: Layer[];
};

type EnvironmentsInstance = InstanceType<
  (typeof Environments.EnvironmentTypes)[number]
>;

export type { EnvironmentObj, Layer, EnvironmentsInstance };
