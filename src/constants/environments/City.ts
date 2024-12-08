import { EnvironmentObj, Layer } from "../../types/environment";
import layer1 from "../../assets/sprite/environments/city/layer-1.png";
import layer2 from "../../assets/sprite/environments/city/layer-2.png";
import layer3 from "../../assets/sprite/environments/city/layer-3.png";
import layer4 from "../../assets/sprite/environments/city/layer-4.png";
import layer5 from "../../assets/sprite/environments/city/layer-5.png";
import Environments from "../../enum/Environments";

class City {
  public static id: number = 1;
  public static name: Environments = Environments.CITY;
  public static width: number = 1667;
  public static height: number = 500;
  public static jumpHeight: number = 25;
  public static gravity: number = 0.45;
  public static groundMargin: number = 80;
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
      id: City.id,
      name: City.name,
      width: City.width,
      height: City.height,
      jumpHeight: City.jumpHeight,
      gravity: City.gravity,
      groundMargin: City.groundMargin,
      layers: City.layers,
    };
  }
}

export default City;
