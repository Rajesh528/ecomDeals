import { createReducer, on } from '@ngrx/store';
import { signupSuccess, loginSuccess, loginFailure,signupFailure, logout } from '../actions/auth.actions';

export interface AuthState {
  user: { username: string; email: string; mobile: string } | null;
  isAuthenticated: boolean;
  error: string | null;
   token?: string | null;
}

export const initialState: AuthState = {
user: null,
  token: null,
  isAuthenticated: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(signupSuccess, (state, { user }) => ({
    ...state,
    user,
    isAuthenticated: true,
    error: null,
  })),
  on(signupFailure, (state, { error }) => ({
    ...state,
    error,
  })),
 on(loginSuccess, (state, { user }) => ({
  ...state,
  user,
  isAuthenticated: true,
  error: null,
})),


  on(loginFailure, (state, { error }) => ({
    ...state,
    error,
        isAuthenticated: false,
  })),
  // ...other handlers
  on(logout, () => ({
     ...initialState
  }))
);
