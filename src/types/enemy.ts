import Enemies from "../classes/characters/enemies";
import EnemyStatesEnum from "../enum/EnemyStates";
import EnemiesEnum, { EnemiesTypes } from "../enum/Enemies";
import EnemyStates from "../handlers/states/enemyStates";

type state = {
  key: EnemyStatesEnum;
  name: EnemyStatesType;
  frameY: number;
  maxFramesX: number;
};

type EnemyObj = {
  id: number;
  name: EnemiesEnum;
  type: EnemiesTypes;
  image: string;
  weight: number;
  speed: number;
  fps: number;
  sprite: {
    width: number;
    height: number;
  };
  frame: {
    width: number;
    height: number;
  };
  states: state[];
};

type EnemyStatesType = keyof typeof EnemyStatesEnum;

type EnemyStateInstance = InstanceType<(typeof EnemyStates.States)[number]>;

type EnemiesTypesInstance = InstanceType<(typeof Enemies.EnemiesTypes)[number]>;

export type {
  EnemyObj,
  state,
  EnemyStatesType,
  EnemyStateInstance,
  EnemiesTypesInstance,
};
