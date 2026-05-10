import {
  Injectable,
  signal,
  computed
} from '@angular/core';

import { CartItem } from '../../shared/models/cart-item.model';
import { Product } from '../../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private readonly storageKey = 'eurovision-cart';

  private readonly cartItemsSignal = signal<CartItem[]>(
    this.loadCart()
  );

  readonly items = this.cartItemsSignal.asReadonly();

  readonly totalCount = computed(() =>
    this.items().reduce(
      (sum, item) => sum + item.quantity,
      0
    )
  );

  readonly totalPrice = computed(() =>
    this.items().reduce(
      (sum, item) =>
        sum + item.product.price * item.quantity,
      0
    )
  );

  addToCart(product: Product): void {

    const items = [...this.items()];

    const existingItem = items.find(
      x => x.product.id === product.id
    );

    if (existingItem) {
      existingItem.quantity++;
    }
    else {
      items.push({
        product,
        quantity: 1
      });
    }

    this.cartItemsSignal.set(items);

    this.saveCart();
  }

  removeFromCart(productId: number): void {

    const updated = this.items()
      .filter(x => x.product.id !== productId);

    this.cartItemsSignal.set(updated);

    this.saveCart();
  }

  increaseQuantity(productId: number): void {

    const items = [...this.items()];

    const item = items.find(
      x => x.product.id === productId
    );

    if (!item) {
      return;
    }

    item.quantity++;

    this.cartItemsSignal.set(items);

    this.saveCart();
  }

  decreaseQuantity(productId: number): void {

    const items = [...this.items()];

    const item = items.find(
      x => x.product.id === productId
    );

    if (!item) {
      return;
    }

    item.quantity--;

    if (item.quantity <= 0) {

      this.removeFromCart(productId);

      return;
    }

    this.cartItemsSignal.set(items);

    this.saveCart();
  }

  clearCart(): void {

    this.cartItemsSignal.set([]);

    this.saveCart();
  }

  private saveCart(): void {

    if (!this.isBrowser()) {
      return;
    }

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.items())
    );
  }

  private loadCart(): CartItem[] {

    if (!this.isBrowser()) {
      return [];
    }

    const raw = localStorage.getItem(
      this.storageKey
    );

    if (!raw) {
      return [];
    }

    try {
      return JSON.parse(raw);
    }
    catch {
      return [];
    }
  }

  private isBrowser(): boolean {

    return typeof window !== 'undefined'
      && typeof localStorage !== 'undefined';
  }

}
