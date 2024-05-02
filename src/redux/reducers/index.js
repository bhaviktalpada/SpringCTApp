import {combineReducers} from 'redux';

//Constant
import netInfoReducer from './netInfo-reducer';
import stateReducer from './state-reducer';

const rootReducer = combineReducers({
  netInfoReducer,
  stateReducer
});

// Exports
export default rootReducer;
