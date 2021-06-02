import ActionTypes from './types';

export const setCurrentUser = (user) => ({
  type: ActionTypes.SET_CURRENT_USER,
  payload: user,
});

export const setOauthCredentials = (credentials) => ({
  type: ActionTypes.SET_OAUTH_CREDENTIALS,
  payload: credentials,
});

export const googleSignInStart = () => ({
  type: ActionTypes.GOOGLE_SIGN_IN_START,
});

export const appleSignInStart = () => ({
  type: ActionTypes.APPLE_SIGN_IN_START,
});

export const signInSuccess = (user) => ({
  type: ActionTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const signInFailure = (error) => ({
  type: ActionTypes.SIGN_IN_FAILURE,
  payload: error,
});

export const signOutStart = () => ({
  type: ActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: ActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFailure = (error) => ({
  type: ActionTypes.SIGN_OUT_FAILURE,
  payload: error,
});

export const signUpStart = (credentials) => ({
  type: ActionTypes.SIGN_UP_START,
  payload: credentials,
});

export const signUpFailure = (error) => ({
  type: ActionTypes.SIGN_UP_FAILURE,
  payload: error,
});

export default {
  setCurrentUser,
  setOauthCredentials,
  googleSignInStart,
  appleSignInStart,
  signInSuccess,
  signInFailure,
  signUpStart,
  signUpFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure,
};
