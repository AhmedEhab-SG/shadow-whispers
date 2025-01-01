type ControlActions = {
  x: number;
  y: number;
  isClick: boolean;
  isHold: boolean;
  isTouch: boolean;
  startCord: { x: number; y: number };
  touches?: { x: number; y: number }[];
};

export type { ControlActions };
