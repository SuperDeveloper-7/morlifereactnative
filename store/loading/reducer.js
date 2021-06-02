import { SET_LOADING } from './types';

const INIT_STATE = {
  spinner: false,
};

const loadingReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        spinner: action.loading,
      };
    default:
      return state;
  }
};

export default loadingReducer;
