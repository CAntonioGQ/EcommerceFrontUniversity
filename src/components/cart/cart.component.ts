import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseService } from 'src/app/adapters/purchase.repository.adapter';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  loading: boolean = false;
  error: string | null = null;
  isLoggedIn: boolean = false;

  constructor(
    private purchaseService: PurchaseService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadCartFromLocalStorage();
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const userData = localStorage.getItem('user');
    this.isLoggedIn = !!userData;
  }

  loadCartFromLocalStorage() {
    this.loading = true;
    try {
      const cartData = localStorage.getItem('cart');
      if (cartData) {
        this.cartItems = JSON.parse(cartData);
      }
      this.loading = false;
    } catch (e) {
      this.error = 'Error al cargar el carrito';
      this.loading = false;
    }
  }

  saveCartToLocalStorage() {
    try {
      localStorage.setItem('cart', JSON.stringify(this.cartItems));
    } catch (e) {
      this.error = 'Error al guardar el carrito';
    }
  }

  addToCart(product: Product) {
    this.cartItems.push(product);
    this.saveCartToLocalStorage();
  }

  removeFromCart(product: Product) {
    const index = this.cartItems.findIndex(item => item.idProduct === product.idProduct);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.saveCartToLocalStorage();
    }
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => {
      const itemPrice = this.parsePrice(item.price);
      return total + itemPrice;
    }, 0);
  }

  private parsePrice(price: unknown): number {
    if (typeof price === 'number') {
      return price;
    }
    if (typeof price === 'string') {
      const cleanedPrice = price.replace(/[^\d.-]/g, '');
      const parsedPrice = parseFloat(cleanedPrice);
      return isNaN(parsedPrice) ? 0 : parsedPrice;
    }
    return 0;
  }

  processOrder() {
    if (!this.isLoggedIn) {
      this.error = 'Debes iniciar sesión para realizar la compra';
      this.router.navigate(['/login']);
      return;
    }

    this.loading = true;
    this.error = null;
    const userId = this.getUserIdFromLocalStorage();
    if (userId === null) {
      this.error = 'Error al obtener la información del usuario';
      this.loading = false;
      return;
    }

    const total = this.getTotal();

    this.purchaseService.processOrder(userId, this.cartItems, total).subscribe(
      (purchase) => {
        this.loading = false;
        this.cartItems = [];
        this.saveCartToLocalStorage();
        alert('Orden procesada con éxito!');
      },
      (error) => {
        this.loading = false;
        this.error = error.message || 'Error al procesar la orden';
      }
    );
  }

  private getUserIdFromLocalStorage(): number | null {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      return user.idUser || null;
    }
    return null;
  }
}