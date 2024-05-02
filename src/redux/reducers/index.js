import {combineReducers} from 'redux';

//Constant
import netInfoReducer from './netInfo-reducer';

const rootReducer = combineReducers({
  netInfoReducer,
});

// Exports
export default rootReducer;
