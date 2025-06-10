import { authReducer, initialState, AuthState } from './auth.reducer';
import {
  signupSuccess,
  signupFailure,
  loginSuccess,
  loginFailure,
  logout,
  clearAuthError
} from '../../actions/auth.actions';

describe('Auth Reducer', () => {
  const mockUser = {
    username: 'testuser',
    email: 'test@example.com',
    mobile: '1234567890',
    password: 'password'
  };

  it('should return the initial state', () => {
    const state = authReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  it('should handle signupSuccess', () => {
    const newState = authReducer(initialState, signupSuccess({ user: mockUser }));
    expect(newState.user).toEqual(mockUser);
    expect(newState.isAuthenticated).toBe(false); // as per your logic
    expect(newState.error).toBeNull();
  });

  it('should handle signupFailure', () => {
    const error = 'Signup failed';
    const newState = authReducer(initialState, signupFailure({ error }));
    expect(newState.error).toBe(error);
  });

  it('should handle loginSuccess', () => {
    const newState = authReducer(initialState, loginSuccess({ user: mockUser }));
    expect(newState.user).toEqual(mockUser);
    expect(newState.isAuthenticated).toBe(true);
    expect(newState.error).toBeNull();
  });

  it('should handle loginFailure', () => {
    const error = 'Invalid credentials';
    const newState = authReducer(initialState, loginFailure({ error }));
    expect(newState.isAuthenticated).toBe(false);
    expect(newState.error).toBe(error);
  });

  it('should handle logout', () => {
    const loggedInState: AuthState = {
      user: mockUser,
      isAuthenticated: true,
      error: null,
      token: 'mock-token'
    };

    const newState = authReducer(loggedInState, logout());
    expect(newState).toEqual(initialState);
  });

  it('should handle clearAuthError', () => {
    const errorState: AuthState = {
      ...initialState,
      error: 'Something went wrong'
    };

    const newState = authReducer(errorState, clearAuthError());
    expect(newState.error).toBeNull();
  });
});
