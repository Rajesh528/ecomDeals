// users.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { loadUsersFromStorage, loadUsersSuccess } from '../actions/user.action';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsersFromStorage),
      map(() => {
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        console.log(localStorage.getItem('users') );
        return loadUsersSuccess({ users: storedUsers });
      })
    )
  );
}
