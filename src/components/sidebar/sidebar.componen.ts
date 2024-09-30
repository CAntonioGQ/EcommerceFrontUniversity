import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { UserService } from 'src/app/adapters/user.repository.adapter';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark py-0">
      <div class="container-fluid">
        <a class="navbar-brand py-2" href="#">
          <img src="assets/logo.png" alt="TechNova Logo" width="100" height="30">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarContent">
          <div class="d-flex flex-grow-1">
            <div class="input-group">
              <button class="btn btn-outline-secondary dropdown-toggle bg-light text-dark" type="button" data-bs-toggle="dropdown" aria-expanded="false">Todo</button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Electrónica</a></li>
                <li><a class="dropdown-item" href="#">Software</a></li>
                <li><a class="dropdown-item" href="#">Hardware</a></li>
              </ul>
              <input type="text" class="form-control" placeholder="Buscar TechNova">
              <button class="btn btn-warning" type="button">
                <i class="bi bi-search"></i>
              </button>
            </div>
          </div>
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <small *ngIf="currentUser">Hola, {{ currentUser.name }}</small><br>
                <strong>Cuenta</strong>
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" (click)="navigateToLogin()">Iniciar Sesión</a></li>
                <li><a class="dropdown-item" (click)="logout()">Cerrar Sesión</a></li>
              </ul>
            </li>
            <li class="nav-item" (click)="navigateToCart()">
              <a class="nav-link text-white" href="/cart">
                <small>Carrito</small><br>
                <strong>y Pedidos</strong>
              </a>
            </li>
            <li class="nav-item" (click)="navigateToCart()">
              <a class="nav-link text-white" href="/cart">
                <i class="bi bi-cart3 fs-4"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div style="background-color: #343a40; color: white;" class="py-1">
            <div class="container-fluid">
        <ul class="nav">
          <li class="nav-item">
            <a class="nav-link text-white" (click)="goToProducts()" href="/products"><i class="bi bi-list me-2"></i>Todo</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" (click)="goToProducts()" href="/products">Ofertas del Día</a>
          </li>
          <li class="nav-item">
            <a class="nav-link text-white" (click)="goToFounds()" href="/founds">Añadir Fondos</a>
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .navbar-brand img {
      filter: brightness(0) invert(1);
    }
    .nav-link small {
      font-size: 0.75rem;
    }
    .nav-link strong {
      font-size: 0.9rem;
    }
  `]
})
export class NavbarComponent implements OnInit {
  currentUser: User | null = null;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    const dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'));
    dropdownElementList.map(function (dropdownToggleEl) {
      return new bootstrap.Dropdown(dropdownToggleEl);
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/login']);
  }

  navigateToCart() {
    this.router.navigate(['/cart']);
  }

  goToProducts() {
    this.router.navigate(['/products']);
  }

  goToFounds() {
    this.router.navigate(['/founds']);
  }
}
