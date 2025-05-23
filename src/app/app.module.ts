import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthEffects } from './store/effects/auth.effects';
import { LoginComponent } from './components/login/login.component';
import { authReducer } from './store/reducers/auth.reducer';
// import { ProductEffects } from './store/effects/product.effects';

@NgModule({
  declarations: [
    AppComponent,
    // LoginComponent
  ],

  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({auth: authReducer }),
    EffectsModule.forFeature([AuthEffects]),
    // EffectsModule.forRoot([ProductEffects,AuthEffects]),
    // StoreModule.forRoot({ productState: productReducer,auth: authReducer }),
    // StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
