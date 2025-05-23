import { createAction, props } from '@ngrx/store';

export const login = createAction('[Auth] Login', props<{ emailOrMobile: string; password: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: any }>());
export const loginFailure = createAction('[Auth] Login Failure', props<{ error: string }>());

export const signup = createAction('[Auth] Signup', props<{ username: string; email: string; mobile: string; password: string }>());
export const signupSuccess = createAction('[Auth] Signup Success', props<{ user: any }>());
export const signupFailure = createAction('[Auth] Signup Failure', props<{ error: string }>());
