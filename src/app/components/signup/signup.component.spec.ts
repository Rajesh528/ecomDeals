import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Router } from '@angular/router';
import { signup } from '../../store/actions/auth.actions';
import { By } from '@angular/platform-browser';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let store: MockStore;
  let dispatchSpy: jasmine.Spy;

  const initialState = {
    auth: {
      error: null
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [ReactiveFormsModule],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch');
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize signupForm with all controls', () => {
    const controls = component.signupForm.controls;
    expect(controls['username']).toBeTruthy();
    expect(controls['email']).toBeTruthy();
    expect(controls['mobile']).toBeTruthy();
    expect(controls['password']).toBeTruthy();
    expect(controls['confirmPassword']).toBeTruthy();
  });

  it('should not dispatch signup if form is invalid', () => {
    component.signupForm.setValue({
      username: '',
      email: '',
      mobile: '',
      password: '',
      confirmPassword: ''
    });

    component.onSubmit();
    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it('should not dispatch signup if password and confirmPassword do not match', () => {
    component.signupForm.setValue({
      username: 'John',
      email: 'john@example.com',
      mobile: '9999999999',
      password: '123456',
      confirmPassword: '654321' // mismatch
    });

    component.onSubmit();
    expect(component.passwordMismatch).toBeTrue();
    expect(dispatchSpy).not.toHaveBeenCalled();
  });

  it('should dispatch signup if form is valid and passwords match', () => {
    const validUser = {
      username: 'Jane',
      email: 'jane@example.com',
      mobile: '9999999999',
      password: 'secure123',
      confirmPassword: 'secure123'
    };

    component.signupForm.setValue(validUser);
    component.onSubmit();

    expect(dispatchSpy).toHaveBeenCalledWith(
      signup({
        username: validUser.username,
        email: validUser.email,
        mobile: validUser.mobile,
        password: validUser.password
      })
    );
  });

  it('should set submitted to true on form submit', () => {
    expect(component.submitted).toBeFalse();
    component.onSubmit();
    expect(component.submitted).toBeTrue();
  });
});
