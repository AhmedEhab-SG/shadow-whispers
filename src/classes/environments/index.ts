import City from "./environmentTypes/City";
import Forest from "./environmentTypes/Forest";
import EnvironmentsEnum from "../../enum/Environments";
import { EnvironmentsInstance } from "../../types/environment";

class Environments {
  public static readonly EnvironmentTypes = [City, Forest];

  public constructor(private height: number) {}

  public getEnvironmentByName(
    uniqueName: EnvironmentsEnum
  ): EnvironmentsInstance {
    return new (Environments.EnvironmentTypes.find(
      (environment) => environment.uniqueName === uniqueName
    )!)(this.height);
  }

  public getRandomEnvironment(): EnvironmentsInstance {
    return new Environments.EnvironmentTypes[
      Math.floor(Math.random() * Environments.EnvironmentTypes.length)
    ](this.height);
  }
}

export default Environments;
