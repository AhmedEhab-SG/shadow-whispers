import Environment from "../Environment";
import ForestObj from "../../../constants/environments/Forest";

class Forest extends Environment {
  public static readonly uniqueName = ForestObj.name;
  public readonly uniqueName = Forest.uniqueName;

  public constructor(height: number) {
    super(ForestObj, height);
  }
}

export default Forest;
