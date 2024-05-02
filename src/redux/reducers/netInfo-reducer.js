import {SET_CONNECTION_TYPE, TOGGLE_CONNECTIVITY} from '../actions/action-list';

const initialState = {
  isConnected: true,
  connectionType: 'NONE',
};

const netInfoReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_CONNECTIVITY: {
      return {
        ...state,
        isConnected: action.value,
      };
    }

    case SET_CONNECTION_TYPE: {
      return {
        ...state,
        connectionType: action.connectionType,
      };
    }

    default: {
      return state;
    }
  }
};

export default netInfoReducer;
