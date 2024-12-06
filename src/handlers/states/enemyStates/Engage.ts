import Enemy from "../../../classes/characters/enemies/Enemy";
import EnemyStates from "../../../enum/EnemyStates";
import { EnemyObj } from "../../../types/enemy";
import State from "../State";

class Engage extends State {
  public static readonly stateName = EnemyStates.ENGAGE;
  public readonly stateName = EnemyStates.ENGAGE;

  constructor(protected enemy: Enemy, protected enemyObj: EnemyObj) {
    super(enemy, enemyObj, EnemyStates.ENGAGE);
  }
}

export default Engage;
