import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'src/components/register-login/login/login.component';
import { MainPageComponent } from 'src/components/main-page/main-page.component'; 
import { RegisterComponent } from 'src/components/register-login/register/register.component';
import { ProductsComponent } from 'src/components/products-page/products-page.component';
import { AddFoundsComponent } from 'src/components/founds/add-founds.component';
import { CartComponent } from 'src/components/cart/cart.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'founds', component: AddFoundsComponent },
  { path: 'cart', component: CartComponent },
  { path: '', component: MainPageComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
