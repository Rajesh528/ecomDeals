// auth.effects.ts
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as AuthActions from '../actions/auth.actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { AuthService } from '../../service/auth.service';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ emailOrMobile, password }) =>
        this.authService.login(emailOrMobile, password).pipe(
          map(user => AuthActions.loginSuccess({ user })),
          catchError(error => of(AuthActions.loginFailure({ error: error.message })))
        )
      )
    )
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signup),
      mergeMap(({ email, password }) =>
        this.authService.signup(email, password).pipe(
          map(user => AuthActions.signupSuccess({ user })),
          catchError(error => of(AuthActions.signupFailure({ error: error.message })))
        )
      )
    )
  );
}
