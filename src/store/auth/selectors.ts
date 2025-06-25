import { RootState } from '../index';

export const selectUser = (state: RootState) => state.auth.user || {firstName: 'User', lastName: 'User', email: 'user@user.com', _id: '123'};
export const selectToken = (state: RootState) => state.auth.token;
export const selectIsAuthenticated = (state: RootState) => !!state.auth.token;
export const selectAuthLoading = (state: RootState) => state.auth.loading;
export const selectAuthError = (state: RootState) => state.auth.error; 