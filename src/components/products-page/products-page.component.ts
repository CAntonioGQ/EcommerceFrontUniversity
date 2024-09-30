import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/adapters/product.repository.adapter';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = false;
  error: string | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.loading = true;
    this.error = null;
    this.productService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
        this.loading = false;
      },
      error => {
        console.error('Error fetching products:', error);
        this.error = 'Hubo un problema al cargar los productos. Por favor, intenta de nuevo más tarde.';
        this.loading = false;
      }
    );
  }

  addToCart(product: Product) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(`Producto añadido al carrito: ${product.name}`);
  }
}