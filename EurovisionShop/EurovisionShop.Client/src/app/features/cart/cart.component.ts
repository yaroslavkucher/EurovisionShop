import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartService } from '../../core/services/cart.service';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  private readonly cartService = inject(CartService);

  readonly items = this.cartService.items;

  readonly totalPrice = this.cartService.totalPrice;

  readonly isEmpty = computed(() =>
    this.items().length === 0
  );

  increaseQuantity(productId: number): void {
    this.cartService.increaseQuantity(productId);
  }

  decreaseQuantity(productId: number): void {
    this.cartService.decreaseQuantity(productId);
  }

  clear(): void {
    this.cartService.clearCart();
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }
}
