import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthState } from '../store/reducers/auth/auth.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private store: Store<{ auth: AuthState }>, private router: Router) {}

canActivate(): Observable<boolean> {
  return this.store.select(state => state.auth.isAuthenticated).pipe(
    take(1),
    tap(isAuth => {
      if (!isAuth) {
        this.router.navigate(['/login']);
      }
    }),
    map(isAuth => isAuth)
  );
}
}
