import { Injectable, signal } from '@angular/core';
import { Product } from '../../products/interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  products = signal<Product[]>([]);

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
        (storeProduct.id === product.id && storeProduct.availableAmount >= quantity)
          ? { ...product, availableAmount: product.availableAmount - quantity }
          : storeProduct
      )
    );
  }
}
