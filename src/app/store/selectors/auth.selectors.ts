import { createSelector } from '@ngrx/store';
import { AuthState } from '../models/auth.model';

export const selectAuth = (state: any) => state.auth;

export const selectUser = createSelector(
  selectAuth,
  (state: AuthState) => state.user
);

export const selectIsLoggedIn = createSelector(
  selectUser,
  (user) => !!user
);
