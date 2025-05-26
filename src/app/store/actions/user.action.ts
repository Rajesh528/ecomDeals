import { createAction, props } from '@ngrx/store';
import { User } from '../models/auth.model';

export const loadUsersFromStorage = createAction('[User] Load Users From Storage');
export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: any[] }>()
);