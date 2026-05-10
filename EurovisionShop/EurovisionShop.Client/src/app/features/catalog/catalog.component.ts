import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../shared/models/product.model';
import { CartService } from '../../core/services/cart.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {
  private productService = inject(ProductService);
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  products = signal<Product[]>([]);
  selectedCategory = '';
  sortBy = 'newest';
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading.set(true);
    this.productService.getProducts(
      this.selectedCategory,
      this.sortBy
    ).subscribe({
      next: (data) => {
        this.products.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Помилка завантаження товарів:', err);
        this.isLoading.set(false);
      }
    });
  }

  onFilterChange(): void {
    this.loadProducts();
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  isInCart(productId: number): boolean {
    return this.cartService.items()
      .some(item => item.product.id === productId);
  }

  handleCartClick(product: Product): void {

    if (this.isInCart(product.id)) {
      this.router.navigate(['/cart']);
      return;
    }

    this.cartService.addToCart(product);
  }
}
