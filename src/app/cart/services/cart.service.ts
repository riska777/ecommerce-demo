import { Injectable, signal } from '@angular/core';
import { Product } from '../../products/interfaces/product.interface';
import { StoreService } from '../../shared/services/store.service';
import { CartItem } from '../interfaces/cart-item.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  /* 
    We use signals to store the cart data in a reactive way.
    Cart data is saved to localStorage so that it persists across page reloads.
  */

  constructor(private storeService: StoreService) {}

  private storageKey = 'ecommerce-app-cart';
  cart = signal<CartItem[]>(this.getCartFromStorage());

  // Get cart data from localStorage
  private getCartFromStorage(): CartItem[] {
    const storedCart = localStorage.getItem(this.storageKey);
    return storedCart ? JSON.parse(storedCart) : [];
  }

  // Save cart data to localStorage
  private saveCartToStorage(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cart()));
  }

  // Add an item to the cart
  addToCart(product: Product, quantity: number): void {
    this.cart.update((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        currentCart.push({ ...product, quantity });
      }

      this.storeService.decrementProductAmount(product, quantity);
      this.saveCartToStorage();
      return currentCart;
    });
  }

  // Remove an item from the cart
  removeFromCart(product: CartItem): void {
    this.cart.update((currentCart) => {
      const updatedCart = currentCart.filter((item) => item.id !== product.id);
      this.saveCartToStorage();
      return updatedCart;
    });
  }

  // Clear the cart
  clearCart(): void {
    this.cart.set([]);
    this.saveCartToStorage();
  }
}
