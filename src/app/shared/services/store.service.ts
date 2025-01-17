import { Injectable, signal } from '@angular/core';
import { Product } from '../../products/interfaces/product.interface';
import { CartItem } from '../../cart/interfaces/cart-item.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  products = signal<Product[]>([]);

  constructor() {}

  setProducts(products: Product[]): void {
    if (!this.products().length) {
      this.products.set(products);
    }
  }

  isProductAvailable(product: Product, quantity: number): boolean {
    return product.availableAmount >= quantity;
  }

  decrementProductAmount(product: Product, quantity: number): void {
    this.products.update((products) =>
      products.map((storeProduct) =>
        storeProduct.id === product.id &&
        storeProduct.availableAmount >= quantity
          ? { ...storeProduct, availableAmount: product.availableAmount - quantity }
          : storeProduct
      )
    );
  }

  checkAvailableQuantity(cartItem: CartItem): Observable<boolean> {
    if (this.products().length) {
      return of(this.isProductAvailableInStore(cartItem));
    } else {
      return of(false);
    }
  }

  getProductAmount(product: Product): number {
    if (!this.products().length) return 0;
    const storeProduct = this.products().find(
      (storeProduct) => storeProduct.id === product.id
    );
    return storeProduct ? storeProduct.availableAmount : 0;
  }

  getProductPrice(cartItem: CartItem): number {
    const storeProduct = this.products().find(
      (storeProduct) => storeProduct.id === cartItem.id
    );
    return storeProduct ? storeProduct.price : 0;
  }

  private isProductAvailableInStore(cartItem: CartItem): boolean {
    const storeProduct = this.products().find(
      (storeProduct) => storeProduct.id === cartItem.id
    );
    return storeProduct
      ? storeProduct.availableAmount >= cartItem.quantity
      : false;
  }

  checkIfMinimalQuantityReached(cartItem: CartItem): Observable<boolean> {
    if (this.products().length) {
      /* Check min amount from store data, its more reliable than stored cart item data */
      const storeProduct = this.products().find(
        (storeProduct) => storeProduct.id === cartItem.id
      );
      return of(
        storeProduct ? storeProduct.minOrderAmount <= cartItem.quantity : false
      );
    } else {
      return of(false);
    }
  }
}
