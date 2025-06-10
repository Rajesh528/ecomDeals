// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { AppComponent } from './app.component';
// import { Store } from '@ngrx/store';
// import { Router, NavigationStart } from '@angular/router';
// import { of, Subject } from 'rxjs';
// import * as AuthActions from './store/actions/auth.actions';
// import { loadUsersFromStorage } from './store/actions/user.action';
// import { HeaderComponent } from './components/header/header.component';
// import { RouterTestingModule } from '@angular/router/testing';

// import { Component } from '@angular/core';


// describe('AppComponent', () => {
//   let component: AppComponent;
//   let fixture: ComponentFixture<AppComponent>;
//   let storeSpy: jasmine.SpyObj<Store>;
//   let routerEventsSubject: Subject<any>;
//   let routerSpy: any;

//   beforeEach(async () => {
//    storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'select']);
//    storeSpy.select.and.returnValue(of(true));

//     routerEventsSubject = new Subject<any>();
//     routerSpy = {
//       events: routerEventsSubject.asObservable()
//     };

//     await TestBed.configureTestingModule({
//       declarations: [AppComponent,HeaderComponent],
//       providers: [
//         { provide: Store, useValue: storeSpy },
//         { provide: Router, useValue: routerSpy }
//       ]
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(AppComponent);
//     component = fixture.componentInstance;
//     spyOn(console, 'log'); // Silence or spy on console output
//     localStorage.clear();
//   });

//   it('should create the app component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should dispatch loadUsersFromStorage and loginSuccess if user exists in localStorage', () => {
//     const mockUser = { id: 1, name: 'Test User',  username: 'User', email: 'user@gmail.com',mobile: '9989989898' };
//     localStorage.setItem('authUser', JSON.stringify(mockUser));

//     component.ngOnInit();

//     expect(storeSpy.dispatch).toHaveBeenCalledWith(loadUsersFromStorage());
//     expect(storeSpy.dispatch).toHaveBeenCalledWith(AuthActions.loginSuccess({ user: mockUser }));
//   });

//   it('should dispatch only loadUsersFromStorage if no user in localStorage', () => {
//     component.ngOnInit();

//     expect(storeSpy.dispatch).toHaveBeenCalledWith(loadUsersFromStorage());
//     expect(storeSpy.dispatch).not.toHaveBeenCalledWith(jasmine.objectContaining(AuthActions.loginSuccess));
//   });

//   it('should dispatch clearAuthError on NavigationStart', () => {
//     component.ngOnInit();

//     storeSpy.dispatch.calls.reset();
//     const navStartEvent = new NavigationStart(1, '/some-path');
//     routerEventsSubject.next(navStartEvent);

//     expect(storeSpy.dispatch).toHaveBeenCalledWith(AuthActions.clearAuthError());
//   });

//   it('should dispatch logout when logout() is called', () => {
//     component.logout();

//     expect(storeSpy.dispatch).toHaveBeenCalledWith(AuthActions.logout());
//   });
// });


// // 🔧 Mock HeaderComponent to avoid store.select errors
// @Component({
//   selector: 'app-header',
//   template: ''
// })
// class MockHeaderComponent {}

// describe('AppComponent', () => {
//   let component: AppComponent;
//   let fixture: ComponentFixture<AppComponent>;
//   let storeSpy: jasmine.SpyObj<Store>;
//   let routerEvents$: Subject<any>;

//   beforeEach(async () => {
//     storeSpy = jasmine.createSpyObj('Store', ['dispatch']);
//     routerEvents$ = new Subject();

//     await TestBed.configureTestingModule({
//       declarations: [AppComponent, MockHeaderComponent],
//       imports: [RouterTestingModule], // ✅ Required for router-outlet
//       providers: [
//         { provide: Store, useValue: storeSpy },
//       ]
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(AppComponent);
//     component = fixture.componentInstance;
//     spyOn(console, 'log');
//     localStorage.clear();
//   });

//   it('should create the app component', () => {
//     expect(component).toBeTruthy();
//   });

//   // ... other test cases
// });
