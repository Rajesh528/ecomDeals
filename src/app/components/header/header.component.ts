import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthState } from '../../store/reducers/auth.reducer';
import { logout } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-header',
  standalone:false,
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  isAuthenticated$: Observable<boolean>;

  constructor(private store: Store<{ auth: AuthState }>, private router : Router) {
    this.isAuthenticated$ = this.store.select(state => state.auth.isAuthenticated);
  }

  onLogout() {
    this.store.dispatch(logout());
    this.router.navigate(['/login'])
  }
}
