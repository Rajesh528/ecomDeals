import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  emailOrMobile = '';
  password = '';

  constructor(private store: Store) {
    console.log("login")
  }

  onLogin() {
    this.store.dispatch(AuthActions.login({ emailOrMobile: this.emailOrMobile, password: this.password }));
  }
}
