import Environment from "../Environment";
import CityObj from "../../../constants/environments/City";

class City extends Environment {
  public static readonly uniqueName = CityObj.name;
  public readonly uniqueName = City.uniqueName;

 public constructor(height: number) {
    super(CityObj, height);
  }
}

export default City;
