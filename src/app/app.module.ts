// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { MainPageComponent } from 'src/components/main-page/main-page.component';
import { ProductService } from './adapters/product.repository.adapter';
import { NavbarComponent } from 'src/components/sidebar/sidebar.componen';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: MainPageComponent },
      // Añade más rutas aquí según sea necesario
    ])
    
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }