const makeStandingFrames = (rootFrame) => {
  return {
    duration: 400,
    frames: [
      {
        time: 0,
        frame: rootFrame,
      },
    ],
  };
};
const makeWalkingFrames = (rootFrame = 0) => {
  return {
    duration: 400,
    frames: [
      {
        time: 0,
        frame: rootFrame,
      },
      {
        time: 100,
        frame: rootFrame + 1,
      },
      {
        time: 200,
        frame: rootFrame + 2,
      },
      {
        time: 300,
        frame: rootFrame + 3,
      },
    ],
  };
};
export const STAND_DOWN = makeStandingFrames(12);
export const STAND_RIGHT = makeStandingFrames(0);
export const STAND_UP = makeStandingFrames(12);
export const STAND_LEFT = makeStandingFrames(7);

export const WALK_DOWN = makeWalkingFrames(12);
export const WALK_RIGHT = makeWalkingFrames(0);
export const WALK_UP = makeWalkingFrames(8);
export const WALK_LEFT = makeWalkingFrames(4);
