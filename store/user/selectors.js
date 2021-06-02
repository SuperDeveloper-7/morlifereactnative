import { createSelector } from 'reselect';

const selectUserState = (state) => state.user;

export const selectIsAuthenticated = createSelector(
  [selectUserState],
  (user) => user.isAuthenticated
);

export const selectUser = createSelector(
  [selectUserState],
  (user) => user.user
);

export const selectOauthCredentials = createSelector(
  [selectUserState],
  (user) => user.oauthCredentials
);
