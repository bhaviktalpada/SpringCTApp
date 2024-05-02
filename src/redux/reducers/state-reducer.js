import {
  DEVICE_INFO,
  SET_APP_STATE,
  SET_DEVICE_ORIENTATION,
  CLEAR_DATA,
} from '../actions/action-list';

const initialState = {
  deviceOrientation: undefined,
  appState: undefined,
  deviceInfo: null,
};

const stateReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DEVICE_ORIENTATION: {
      return {
        ...state,
        deviceOrientation: action.deviceOrientation,
      };
    }

    case SET_APP_STATE: {
      return {
        ...state,
        appState: action.appState,
      };
    }

    case DEVICE_INFO: {
      return {
        ...state,
        deviceInfo: action.data,
      };
    }

    case CLEAR_DATA: {
      return {
        ...state,
      };
    }

    default: {
      return state;
    }
  }
};

export default stateReducer;
