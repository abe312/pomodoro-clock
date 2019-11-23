import {
  BREAK_INCREASE,
  BREAK_DECREASE,
  SESSION_INCREASE,
  SESSION_DECREASE,
  START,
  PAUSE,
  RESET,
} from '../constants';

const breakInc = () => ({
  type: BREAK_INCREASE,
});
const breakDec = () => ({
  type: BREAK_DECREASE,
});

const sessionInc = () => ({
  type: SESSION_INCREASE,
});

const sessionDec = () => ({
  type: SESSION_DECREASE,
});

// const state = () => ({
//   type: START,
// });
// const pause = () => ({
//   type: PAUSE,
// });

// const reset = () => ({
//   type: RESET,
// });

export { breakInc, breakDec, sessionInc, sessionDec };
