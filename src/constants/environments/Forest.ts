import { EnvironmentObj, Layer } from "../../types/environment";
import layer1 from "../../assets/sprite/environments/forest/layer-1.png";
import layer2 from "../../assets/sprite/environments/forest/layer-2.png";
import layer3 from "../../assets/sprite/environments/forest/layer-3.png";
import layer4 from "../../assets/sprite/environments/forest/layer-4.png";
import layer5 from "../../assets/sprite/environments/forest/layer-5.png";
import Environments from "../../enum/Environments";

class Forest {
  public static id: number = 2;
  public static name: Environments = Environments.FOREST;
  public static width: number = 1667;
  public static height: number = 500;
  public static jumpHeight: number = 25;
  public static gravity: number = 0.45;
  public static groundMargin: number = 50;
  public static layers: Layer[] = [
    {
      image: layer1,
      speed: 0,
    },
    {
      image: layer2,
      speed: 0.2,
    },
    {
      image: layer3,
      speed: 0.4,
    },
    {
      image: layer4,
      speed: 0.8,
    },
    {
      image: layer5,
      speed: 1,
    },
  ];

  public static get environmentObj(): EnvironmentObj {
    return {
      id: Forest.id,
      name: Forest.name,
      width: Forest.width,
      height: Forest.height,
      jumpHeight: Forest.jumpHeight,
      gravity: Forest.gravity,
      groundMargin: Forest.groundMargin,
      layers: Forest.layers,
    };
  }
}

export default Forest;
