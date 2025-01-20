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

  addToCart(product: Product, quantity: number): void {
    this.storeService._cart.update((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        currentCart.push({ ...product, quantity });
      }

      this.storeService.decrementProductAmount(product, quantity);
      this.storeService.saveCartToStorage();
      return currentCart;
    });
  }

  removeFromCart(product: CartItem): void {
    this.storeService._cart.update((currentCart) => {
      const updatedCart = currentCart.filter((item) => item.id !== product.id);
      this.storeService.saveCartToStorage(updatedCart);
      return updatedCart;
    });
  }

  clearCart(): void {
    this.storeService._cart.set([]);
    this.storeService.saveCartToStorage();
  }

  cartTotalPrice(): number {
    return this.storeService.cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  }
}
