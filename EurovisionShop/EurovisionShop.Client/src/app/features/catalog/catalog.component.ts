import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {
  private productService = inject(ProductService);

  products = signal<Product[]>([]);
  selectedCategory = signal<string>('');
  sortBy = signal<string>('newest');
  isLoading = signal<boolean>(true);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading.set(true);
    this.productService.getProducts(this.selectedCategory(), this.sortBy()).subscribe({
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
}
