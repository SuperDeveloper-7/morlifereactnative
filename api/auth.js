import api from '../services/api.service';

export const verifyWithGoogle = (data) => api.post('auth/verify-google', data);
export const verifyWithApple = (data) => api.post('auth/verify-apple', data);
export const validateUsername = (data) => api.post('auth/validate', data);
export const signUp = (data) => api.post('auth/signup', data);
export const signOut = () => api.post('auth/signout');
export const refreshToken = (data) => api.post('auth/refresh-token', data);
export const authorize = (data) => api.post('auth/authorize', data);
