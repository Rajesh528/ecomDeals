import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';

export interface AuthState {
  user: any;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.loginSuccess, AuthActions.signupSuccess, (state, { user }) => ({
    ...state,
    user,
    error: null,
  })),
  on(AuthActions.loginFailure, AuthActions.signupFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
