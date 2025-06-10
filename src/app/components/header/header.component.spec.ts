import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { AuthState } from '../../store/reducers/auth/auth.reducer';
import { logout } from '../../store/actions/auth.actions';
import { Router } from '@angular/router';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let storeSpy: jasmine.SpyObj<Store<{ auth: AuthState }>>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: Store, useValue: storeSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    storeSpy.select.and.returnValue(of(true)); // mock user is authenticated

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the header component', () => {
    expect(component).toBeTruthy();
  });

  it('should get isAuthenticated$ from store', (done) => {
    component.isAuthenticated$.subscribe(value => {
      expect(value).toBeTrue();
      done();
    });
  });

  it('should dispatch logout and navigate to /login on logout', () => {
    component.onLogout();

    expect(storeSpy.dispatch).toHaveBeenCalledWith(logout());
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
