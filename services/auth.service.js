import * as Google from 'expo-google-app-auth';
import * as Apple from 'expo-apple-authentication';
import { GOOGLE_IOS_CLIENT_ID, GOOGLE_STANDALONE_IOS_CLIENT_ID } from '@env';
import {
  verifyWithGoogle,
  verifyWithApple,
  authorize,
  validateUsername,
  signUp,
  signOut,
} from '../api/auth';
import { getToken, setToken } from './storage.service';
import apiService from './api.service';
import { OAUTH_APPLE_USER, OAUTH_GOOGLE_USER } from '../constants/String';

const verifyOAuthUser = async (credentials) => {
  if (!credentials) throw new Error('no credentials');

  let response;
  switch (credentials.type) {
    case OAUTH_GOOGLE_USER:
      response = await verifyWithGoogle(credentials);
      break;
    case OAUTH_APPLE_USER:
      response = await verifyWithApple(credentials);
      break;
    default:
      throw new Error('invalid oauth type');
  }

  const result = response.data;
  const sn = result.status !== 'verified';
  let user;

  if (sn) {
    const { tokens } = result;
    setToken(tokens);
    apiService.setHeader(tokens.accessToken);
    user = result.user;
  }

  return { user, credentials, sn };
};

export const signInGoogle = async () => {
  const result = await Google.logInAsync({
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    iosStandaloneAppClientId: GOOGLE_STANDALONE_IOS_CLIENT_ID,
    scopes: ['profile', 'email'],
  });

  if (result.type === 'cancel') throw new Error('cancelled');

  return await verifyOAuthUser({ ...result, type: OAUTH_GOOGLE_USER });
};

export const signInApple = async () => {
  const result = await Apple.signInAsync({
    requestedScopes: [
      Apple.AppleAuthenticationScope.FULL_NAME,
      Apple.AppleAuthenticationScope.EMAIL,
    ],
  });

  return await verifyOAuthUser({ ...result, type: OAUTH_APPLE_USER });
};

export const signup = async (credentials) => {
  const {
    data: { user, tokens },
  } = await signUp(credentials);
  setToken(tokens);
  apiService.setHeader(tokens.accessToken);
  return user;
};

export const signout = () => {
  return true;
};

export const authorizeToken = async () => {
  const oldTokens = await getToken();
  const { user, tokens } = await authorize(oldTokens);
  setToken(tokens);
  apiService.setHeader(tokens.accessToken);
  return user;
};

export const extractFullName = (credentials) => {
  const fullName = { firstName: '', lastName: '' };
  if (credentials) {
    if (credentials.type === OAUTH_GOOGLE_USER) {
      fullName.firstName = credentials.user.givenName;
      fullName.lastName = credentials.user.familyName;
    } else if (credentials.type === OAUTH_APPLE_USER && credentials.fullName) {
      fullName.firstName = credentials.fullName.givenName;
      fullName.lastName = credentials.fullName.familyName;
    }
  }
  return fullName;
};

export default {
  verifyWithGoogle,
  verifyWithApple,
  authorizeToken,
  extractFullName,
  validateUsername,
  signup,
  signout,
};
