import { createReducer, on } from '@ngrx/store';
import { addUser } from '../actions/auth.actions';
import { User } from '../models/auth.model';
import { loadUsersSuccess } from '../actions/user.action';
export interface UsersState {
  users: User[];
}

export const initialState: UsersState = {
  users: []
};

export const usersReducer = createReducer(
  initialState,
 on(addUser, (state, { user }) => ({
  ...state,
  users: [...state.users, user] 
})),
  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    users
  }))
  
);
