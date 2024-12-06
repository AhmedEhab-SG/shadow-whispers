import Enemy from "../../../classes/characters/enemies/Enemy";
import EnemyStatesEnum from "../../../enum/EnemyStates";
import { EnemyObj, EnemyStateInstance } from "../../../types/enemy";
import Engage from "./Engage";

class EnemyStates {
  public static readonly States = [Engage];

  public States: InstanceType<(typeof EnemyStates.States)[number]>[];

  constructor(protected enemy: Enemy, protected enemyObj: EnemyObj) {
    this.States = EnemyStates.States.map((StateClass) => {
      return new StateClass(this.enemy, this.enemyObj);
    });
  }

  public getState(stateName: EnemyStatesEnum): EnemyStateInstance {
    return this.States.find((state) => state.stateName === stateName)!;
  }
}

export default EnemyStates;
