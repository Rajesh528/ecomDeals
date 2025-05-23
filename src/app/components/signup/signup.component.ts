import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  username = '';
  email = '';
  mobile = '';
  password = '';

  constructor(private store: Store) {}

  onSignup() {
   // this.store.dispatch(AuthActions.signup({ username: this.username, email: this.email, mobile: this.mobile, password: this.password }));
  }
}
