import ShadowDogImg from "../../../assets/sprite/hero/shadow_dog.png";
import Heroes from "../../../enum/Heroes";
import HeroStates from "../../../enum/HeroStates";
import { HeroObj, States } from "../../../types/hero";

class ShadowDog {
  public static id: number = 1;
  public static name: Heroes = Heroes.SHADOW_DOG;
  public static image: string = ShadowDogImg;
  public static width: number = 100;
  public static height: number = 91.3;
  public static weight: number = 1;
  public static speed: number = 1;
  public static lives: number = 5;
  public static energy: number = 100;
  public static fps: number = 20;
  public static sprite = {
    width: 6876,
    height: 5230,
  };
  public static frame = {
    width: 575,
    height: 523,
  };
  public static states: States[] = [
    {
      key: HeroStates.IDLE,
      name: "IDLE",
      frameY: 0,
      maxFramesX: 6,
    },
    {
      key: HeroStates.JUMP_RIGHT,
      name: "JUMP_RIGHT",
      frameY: 1,
      maxFramesX: 6,
    },
    {
      key: HeroStates.JUMP_LEFT,
      name: "JUMP_LEFT",
      frameY: 1,
      maxFramesX: 6,
    },
    {
      key: HeroStates.FALL_RIGHT,
      name: "FALL_RIGHT",
      frameY: 2,
      maxFramesX: 6,
    },
    {
      key: HeroStates.FALL_LEFT,
      name: "FALL_LEFT",
      frameY: 2,
      maxFramesX: 6,
    },
    {
      key: HeroStates.RUN_RIGHT,
      name: "RUN_RIGHT",
      frameY: 3,
      maxFramesX: 6,
    },
    {
      key: HeroStates.RUN_LEFT,
      name: "RUN_LEFT",
      frameY: 3,
      maxFramesX: 6,
    },
    {
      key: HeroStates.DIZZY,
      name: "DIZZY",
      frameY: 4,
      maxFramesX: 8,
    },
    {
      key: HeroStates.SIT,
      name: "SIT",
      frameY: 5,
      maxFramesX: 4,
    },
    {
      key: HeroStates.ROLL_RIGHT,
      name: "ROLL_RIGHT",
      frameY: 6,
      maxFramesX: 6,
    },
    {
      key: HeroStates.ROLL_LEFT,
      name: "ROLL_LEFT",
      frameY: 6,
      maxFramesX: 6,
    },
    {
      key: HeroStates.DIVE,
      name: "DIVE",
      frameY: 6, // same as roll
      maxFramesX: 6,
    },
    {
      key: HeroStates.DEAD,
      name: "DEAD",
      frameY: 8,
      maxFramesX: 11,
    },
    {
      key: HeroStates.HURT,
      name: "HURT",
      frameY: 9,
      maxFramesX: 3,
    },
  ];

  public static get heroObj(): HeroObj {
    return {
      id: ShadowDog.id,
      name: ShadowDog.name,
      image: ShadowDog.image,
      weight: ShadowDog.weight,
      speed: ShadowDog.speed,
      lives: ShadowDog.lives,
      energy: ShadowDog.energy,
      fps: ShadowDog.fps,
      sprite: ShadowDog.sprite,
      frame: ShadowDog.frame,
      states: ShadowDog.states,
    };
  }
}

export default ShadowDog;
