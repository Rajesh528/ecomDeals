import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as AuthActions from '../../store/actions/auth.actions';
import { login } from '../../store/actions/auth.actions'; 
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
   standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  //authError$ = this.store.select((state:any) => state.auth.error);

  constructor(private fb: FormBuilder, private store: Store, public router:Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;
    const { email, password } = this.loginForm.value;
    this.store.dispatch(login({ emailOrMobile: email, password }));
    console.log("called")    
  }
}