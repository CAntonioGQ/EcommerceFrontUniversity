// main-page.component.ts
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/adapters/product.repository.adapter';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
})
export class MainPageComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = false;
  error: string | null = null;

  // Para el carrusel
  carouselItems = [
    { image: 'assets/Banner1.jpeg', alt: 'Oferta especial' },
    { image: 'assets/Banner2.jpg', alt: 'Nuevos productos' },
    { image: 'assets/Banner3.jpg', alt: 'Descuentos exclusivos' }
  ];

  // Categorías
  categories = [
    {
      title: "Electrónicos",
      items: [
        { name: "Laptops", image: "assets/Laptop.PNG" },
        { name: "Smartphones", image: "assets/Phone.jpg" },
        { name: "Tablet", image: "assets/Tablet.PNG" },
        { name: "Accesorios", image: "assets/Accesorios.jpeg" }
      ]
    },
    {
      title: "Hogar Inteligente",
      items: [
        { name: "Asistentes de voz", image: "assets/Alexa.jpg" },
        { name: "Iluminación", image: "assets/Led.jpg" },
        { name: "Seguridad", image: "assets/Cam.jpg" },
        { name: "Termostatos", image: "assets/Termostato.jpg" }
      ]
    }
  ];

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
    // Aquí implementarías la lógica para añadir al carrito
    console.log(`Producto añadido al carrito: ${product.getName}`);
    // Por ejemplo, podrías llamar a un método de un servicio de carrito
    // this.cartService.addItem(product);
  }
}