import Environments from "../enum/Environments";

type Layer = {
  image: string;
  speed: number;
};

type EnvironmentObj = {
  id: number;
  name: Environments;
  width: number;
  height: number;
  jumpHeight: number;
  groundMargin: number;
  gravity: number;
  layers: Layer[];
};

export type { EnvironmentObj, Layer };
