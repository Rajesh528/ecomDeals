import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { signup, signupSuccess, login, loginSuccess, loginFailure, logout, signupFailure, addUser } from '../actions/auth.actions';
import { Router } from '@angular/router';
import { NewUser, User } from '../models/auth.model';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions)
  constructor( private router: Router) { }

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signup),
      switchMap(({ username, email, mobile, password }) => {
        const newUser = { username, email, mobile, password };
        const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
        const emailExists = storedUsers.users.findIndex((user: NewUser) => user.email === email);
        if (emailExists !== -1) {
          console.log("failed");
          return of(signupFailure({ error: 'Email already exists. Please use a different email.' }));
        }
        storedUsers.users.push(newUser);
        localStorage.setItem('users', JSON.stringify(storedUsers));
        this.router.navigate(['/login'])
        return of(signupSuccess({ user: newUser }),
        addUser({ user: newUser }));
      })
    )
  );

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      switchMap(({ emailOrMobile, password }) => {
        const storedUser = JSON.parse(localStorage.getItem('users') || '{}');
        const index = storedUser?.users.findIndex((obj:User)=>(obj.email === emailOrMobile || obj.mobile === emailOrMobile) &&
          obj.password === password);
          console.log(index)
        if (index !== -1) {
          console.log("welcome to effects");
          return of(loginSuccess({ user: storedUser?.users[index] }));
        } else {
          console.log(" effects failed");
          return of(loginFailure({ error: 'Invalid email, mobile, or password' }));
        }
      }),
      catchError((error) => of(loginFailure({ error: 'Login failed' })))
    )
  );
  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(({ user }) => {
          this.router.navigate(['./home'])
          localStorage.setItem('authUser', JSON.stringify(user));
        })
      ),
    { dispatch: false }
  );
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          localStorage.removeItem('authUser');
        })
      ),
    { dispatch: false }
  );
  logoutRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => this.router.navigate(['/login']))
      ),
    { dispatch: false }
  );
}
