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
  private saveCartToStorage(updatedCart?: CartItem[]): void {
    localStorage.removeItem(this.storageKey);
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(updatedCart ? updatedCart : this.cart())
    );
  }

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

  removeFromCart(product: CartItem): void {
    this.cart.update((currentCart) => {
      const updatedCart = currentCart.filter((item) => item.id !== product.id);
      this.saveCartToStorage(updatedCart);
      return updatedCart;
    });
  }

  clearCart(): void {
    this.cart.set([]);
    this.saveCartToStorage();
  }

  /* If the cart has more items than available, then it reduces the quantity, 
    and also decrements store value 
  */
  reduceCartItemQuantity(): void {
    this.cart.update((currentCart) => {
      for (const cartItem of currentCart) {
        const availableAmount = this.storeService.getProductAmount(cartItem);
        if (cartItem.quantity >= availableAmount) {
          cartItem.quantity = availableAmount;
        }
        this.storeService.decrementProductAmount(cartItem, cartItem.quantity);
      }

      this.saveCartToStorage();
      return currentCart;
    });
  }

  cartTotalPrice(): number {
    return this.cart().reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  }

  syncProductPriceWithStore(): void {
    this.cart.update((currentCart) => {
      const updatedCart = currentCart.map((cartItem) => {
        cartItem.price = this.storeService.getProductPrice(cartItem);
        return cartItem;
      });

      this.saveCartToStorage(updatedCart);
      return updatedCart;
    });
  }
}
