import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthEffects } from './store/effects/auth.effects';
import { LoginComponent } from './components/login/login.component';
import { authReducer } from './store/reducers/auth.reducer';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ProductsPageComponent } from './components/products/products-page.component';
import { ProductEffects } from './store/effects/product.effects';
import { productReducer } from './store/reducers/product.reducer';
import { HeaderComponent } from './components/header/header.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
// import { ProductEffects } from './store/effects/product.effects';
import { localStorageSync } from 'ngrx-store-localstorage';
import { usersReducer } from './store/reducers/user.reducer';

export function localStorageSyncReducer(reducer: any): any {
  return localStorageSync({
    keys: ['users'], // only persist auth state
    rehydrate: true
  })(reducer);
}

const metaReducers: MetaReducer[] = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
     SignupComponent,
      ProductsPageComponent,
      HeaderComponent
  ],

  imports: [
    BrowserModule,
    FormsModule, 
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule,
    EffectsModule.forRoot([ProductEffects,AuthEffects]),
    StoreModule.forRoot({ auth: authReducer,productState: productReducer , users: usersReducer},
      { metaReducers }
    ),
    EffectsModule.forFeature([AuthEffects]),
    StoreDevtoolsModule.instrument({
    maxAge: 25, // Retains last 25 states
    logOnly: environment.production, // Restrict extension in production
  }),
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
console.log(isDevMode());
