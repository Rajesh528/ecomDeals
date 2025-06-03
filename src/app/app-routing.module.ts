import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProductsPageComponent } from './components/products/products-page.component';
import { AuthGuard } from './guards/auth.guard';
import { StoresComponent } from './stores/stores.component';

const routes: Routes = [
  {
    path: "login", component: LoginComponent
  },
  {
    path: "signup", component: SignupComponent
  },
  {
    path: "stores", component: StoresComponent, canActivate:[AuthGuard]
  },
   {path:"home",component:ProductsPageComponent, canActivate:[AuthGuard]},
   {
    path: "", redirectTo:"login" , pathMatch:"full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
