import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/String';

export const setToken = async (tokens) => {
  try {
    const { accessToken, refreshToken } = tokens;

    await AsyncStorage.multiSet([
      [ACCESS_TOKEN, accessToken],
      [REFRESH_TOKEN, refreshToken],
    ]);

    return { accessToken, refreshToken };
  } catch (e) {}
};

export const getToken = async () => {
  const tokens = await AsyncStorage.multiGet([ACCESS_TOKEN, REFRESH_TOKEN]);

  return {
    accessToken: tokens.find((t) => t[0] === ACCESS_TOKEN)[1],
    refreshToken: tokens.find((t) => t[0] === REFRESH_TOKEN)[1],
  };
};
