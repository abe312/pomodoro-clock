import {
  BREAK_INCREASE,
  BREAK_DECREASE,
  SESSION_INCREASE,
  SESSION_DECREASE,
} from '../constants';

const initialState = {
  breakL: 5,
  session: 25,
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
      if (state.breakL > 1) {
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
      if (state.session > 1) {
        const session = state.session - 1;
        return { ...state, session };
      } else return state;
    }
    default:
      return state;
  }
};

export default controlReducer;
