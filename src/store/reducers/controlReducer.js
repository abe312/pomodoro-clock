import {
  BREAK_INCREASE,
  BREAK_DECREASE,
  SESSION_INCREASE,
  SESSION_DECREASE,
  SET_BREAK,
  SET_SESSION,
} from '../constants';

const initialState = {
  breakL: 1,
  session: 1,
  current: 'Break',
};

// const change(arr, op) {
//   if(op === 'inc'){

//   }
//   if(op === 'dec'){

//   }
// }

const controlReducer = (state = initialState, action) => {
  switch (action.type) {
    case BREAK_INCREASE: {
      if (state.breakL < 59) {
        const breakL = state.breakL + 1;
        return { ...state, breakL };
      } else return state;
    }
    case BREAK_DECREASE: {
      if (state.breakL > 0) {
        const breakL = state.breakL - 1;
        return { ...state, breakL };
      } else return state;
    }
    case SESSION_INCREASE: {
      if (state.session < 59) {
        const session = state.session + 1;
        return { ...state, session };
      } else return state;
    }
    case SESSION_DECREASE: {
      if (state.session > 0) {
        const session = state.session - 1;
        return { ...state, session };
      } else return state;
    }
    case SET_BREAK: {
      return { ...state, current: 'Break' };
    }
    case SET_SESSION: {
      return { ...state, current: 'Session' };
    }
    default:
      return state;
  }
};

export default controlReducer;
