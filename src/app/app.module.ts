import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MainPageComponent } from 'src/components/main-page/main-page.component';
import { ProductService } from './adapters/product.repository.adapter';
import { NavbarComponent } from 'src/components/sidebar/sidebar.componen';
import { LoginComponent } from 'src/components/register-login/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from 'src/components/register-login/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from 'src/components/products-page/products-page.component';
import { AddFoundsComponent } from 'src/components/founds/add-founds.component';
import { CartComponent } from 'src/components/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProductsComponent,
    CartComponent,
    AddFoundsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule  ,
    ReactiveFormsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
