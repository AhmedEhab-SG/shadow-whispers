import Enemy from "../../classes/characters/enemies/Enemy";
import Hero from "../../classes/characters/heroes/Hero";
import BaseKeys from "../../enum/BaseKeys";
import EnemyStates from "../../enum/EnemyStates";
import HeroStates from "../../enum/HeroStates";
import IState from "../../interfaces/IState";
import { EnemyObj } from "../../types/enemy";
import { HeroObj } from "../../types/hero";

abstract class State implements IState {
  protected constructor(
    protected character: Hero | Enemy,
    protected characterObj: HeroObj | EnemyObj,
    protected state: HeroStates | EnemyStates
  ) {}

  public enter() {
    this.character.frameX = 0; //to stop blinking when changing states

    this.character.maxFrameX = this.characterObj.states.find(
      ({ key }) => key === this.state
    )?.maxFramesX!; // set max frames for current state

    this.character.frameY = this.characterObj.states.find(
      ({ key }) => key === this.state
    )?.frameY!; // set frameY for current state
  }

  public keysHandler(_keys: BaseKeys[]): void {}

  public exit(): void {}

  protected calcJumpHeight(
    gameHeight: number,
    groundMargin: number,
    characterHeight: number,
    characterWeight: number,
    enviGravity: number,
    scalingFactor = 0.062
  ): number {
    return (
      ((enviGravity * (gameHeight - groundMargin - characterHeight)) /
        (characterWeight * enviGravity)) *
      scalingFactor
    );
  }
}

export default State;
