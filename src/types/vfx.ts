type VfxObj = {
  id: number;
  name: string;
  image: string;
  fps: number;
  maxFrameX: number;
  sprite: {
    width: number;
    height: number;
  };
  frame: {
    width: number;
    height: number;
  };
};

export type { VfxObj };
