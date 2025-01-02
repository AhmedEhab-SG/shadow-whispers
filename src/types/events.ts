export interface ControlActions {
  x: number;
  y: number;
  isClick: boolean;
  isHold: boolean;
  isTouch: boolean;
  startCord: { x: number; y: number };
  startCords: { x: number; y: number; identifier: number }[];
  touches: { x: number; y: number; identifier: number }[];
}
