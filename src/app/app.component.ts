import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AuthActions from './store/actions/auth.actions';
import { loadUsersFromStorage } from './store/actions/user.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title: string = 'ecomDeals';
  constructor(private store: Store) {


  }
  ngOnInit() {

    console.log("app component loaded");
    this.store.dispatch(loadUsersFromStorage());
    const user = localStorage.getItem('authUser');
    if (user) {
      this.store.dispatch(AuthActions.loginSuccess({ user: JSON.parse(user) }));
    }
  }
  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
