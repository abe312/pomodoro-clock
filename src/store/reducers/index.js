import controlReducer from './controlReducer';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  controls: controlReducer,
});

export default rootReducer;
