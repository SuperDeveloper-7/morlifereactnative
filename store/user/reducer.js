import ActionTypes from './types';

const INITIAL_STATE = {
  user: null,
  oauthCredentials: null,
  error: null,
  isAuthenticated: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
      };
    case ActionTypes.SET_OAUTH_CREDENTIALS:
      return {
        ...state,
        oauthCredentials: action.payload,
      };
    case ActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
        isAuthenticated: true,
      };
    case ActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        user: null,
        error: null,
        oauthCredentials: null,
        isAuthenticated: false,
      };
    case ActionTypes.SIGN_IN_FAILURE:
    case ActionTypes.SIGN_OUT_FAILURE:
    case ActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
