import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as AuthActions from '../../store/actions/auth.actions';
import { Store } from '@ngrx/store';
@Component({
  selector: 'app-login',
   standalone: false,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,private store: Store) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;
    console.log('Login data:', { email, password });
  if (this.loginForm.invalid) return;
  this.store.dispatch(AuthActions.login({ email, password }));
  }
}


// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Store } from '@ngrx/store';
// import { login } from '../../store/actions/auth.actions';  
// import { Router } from '@angular/router';
// import { Observable } from 'rxjs';

// @Component({
//   selector: 'app-login',
//    standalone: false,
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent {
//   loginForm: FormGroup;
//   submitted = false;
//   authError$!: Observable<string | null>;

//   constructor(private fb: FormBuilder, private store: Store, public router:Router) {
//     this.loginForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required]
//     });
//   }
//    ngOnInit(): void {
//     this.authError$ = this.store.select((state:any) => state.auth.error);
//   }

//   onSubmit() {
//     this.submitted = true;
//     if (this.loginForm.invalid) return;
//     const { email, password } = this.loginForm.value;
//     this.store.dispatch(login({ emailOrMobile: email, password }))    
//   }
// }
