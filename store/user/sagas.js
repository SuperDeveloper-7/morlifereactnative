import { all, call, put, takeLatest } from 'redux-saga/effects';

import {
  GOOGLE_SIGN_IN_START,
  APPLE_SIGN_IN_START,
  SIGN_UP_START,
  SIGN_OUT_START,
} from './types';
import {
  setOauthCredentials,
  signInFailure,
  signInSuccess,
  signOutFailure,
  signOutSuccess,
  signUpFailure,
} from './actions';
import {
  signInGoogle,
  signInApple,
  signup,
  signout,
} from '../../services/auth.service';

export function* signInProcess({ user, credentials, sn }) {
  if (sn) {
    yield put(signInSuccess(user));
  }
  yield put(setOauthCredentials(credentials));
}

export function* signInWithGoogle() {
  try {
    const result = yield call(signInGoogle);
    yield call(signInProcess, result);
  } catch (e) {
    yield put(signInFailure(e.message));
  }
}

export function* signInWithApple() {
  try {
    const result = yield call(signInApple);
    yield call(signInProcess, result);
  } catch (e) {
    yield put(signInFailure(e.message));
  }
}

export function* signUp({ payload }) {
  try {
    const user = yield call(signup, payload);
    yield put(signInSuccess(user));
  } catch (e) {
    yield put(signUpFailure(e.message));
  }
}

export function* signOut() {
  try {
    yield call(signout);
    yield put(signOutSuccess());
  } catch (e) {
    yield put(signOutFailure(e.message));
  }
}

export function* onSignInWithGoogleStart() {
  yield takeLatest(GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onSignInWithAppleStart() {
  yield takeLatest(APPLE_SIGN_IN_START, signInWithApple);
}

export function* onSignUpStart() {
  yield takeLatest(SIGN_UP_START, signUp);
}

export function* onSignOutStart() {
  yield takeLatest(SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield all([
    call(onSignInWithGoogleStart),
    call(onSignInWithAppleStart),
    call(onSignUpStart),
    call(onSignOutStart),
  ]);
}
