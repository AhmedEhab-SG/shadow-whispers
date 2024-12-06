import Heroes from "../classes/characters/heroes";
import HeroStatesEnum from "../enum/HeroStates";
import HeroStates from "../handlers/states/heroStates";
import HeroesEnum from "../enum/Heroes";

type HeroStatesType = keyof typeof HeroStatesEnum;

type States = {
  key: HeroStatesEnum;
  name: HeroStatesType;
  frameY: number;
  maxFramesX: number;
};

type HeroObj = {
  id: number;
  name: HeroesEnum;
  image: string;
  weight: number;
  speed: number;
  lives: number;
  energy: number;
  fps: number;
  sprite: {
    width: number;
    height: number;
  };
  frame: {
    width: number;
    height: number;
  };
  states: States[];
};

type HeroStateInstance = InstanceType<(typeof HeroStates.States)[number]>;

type HeroesTypesInstance = InstanceType<(typeof Heroes.HeroTypes)[number]>;

export type {
  HeroObj,
  HeroStatesType,
  States,
  HeroStateInstance,
  HeroesTypesInstance,
};
