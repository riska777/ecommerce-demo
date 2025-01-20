import { effect, Injectable, signal } from '@angular/core';
import { Product } from '../../products/interfaces/product.interface';
import { CartItem } from '../../cart/interfaces/cart-item.interface';
import { Observable, of, Subscription } from 'rxjs';
import { ProductsService } from '../../products/services/products.service';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  private storageKey = 'ecommerce-app-cart';
  private subscriptions = new Subscription();
  private _products = signal<Product[]>([]);
  private _initialized = signal<boolean>(false);
  _cart = signal<CartItem[]>([]);

  constructor(private productsService: ProductsService) {
    this.loadCart();

    effect(() => {
      if (this.products.length > 0) {
        this.reduceCartItemQuantity();
        this.syncCartWithStorePrice();
        this._initialized.set(true);
      }
    });
  }

  get cart(): CartItem[] {
    return this._cart();
  }

  get products(): Product[] {
    return this._products();
  }

  private loadCart(): void {
    this._cart.set(this.getCartFromStorage());
  }

  loadProducts(): void {
    if (this._initialized()) return;
    this.subscriptions.add(
      this.productsService.getProducts().subscribe((products) => {
        this._products.set(products);
      })
    );
  }

  // Get cart data from localStorage
  private getCartFromStorage(): CartItem[] {
    const storedCart = localStorage.getItem(this.storageKey);
    return storedCart ? JSON.parse(storedCart) : [];
  }

  // Save cart data to localStorage
  saveCartToStorage(updatedCart?: CartItem[]): void {
    localStorage.removeItem(this.storageKey);
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(updatedCart ? updatedCart : this.cart)
    );
  }

  isProductAvailable(product: Product, quantity: number): boolean {
    return product.availableAmount >= quantity;
  }

  decrementProductAmount(product: Product, quantity: number): void {
    this._products.update((products) =>
      products.map((storeProduct) =>
        storeProduct.id === product.id &&
        storeProduct.availableAmount >= quantity
          ? {
              ...storeProduct,
              availableAmount: product.availableAmount - quantity,
            }
          : storeProduct
      )
    );
  }

  checkAvailableQuantity(cartItem: CartItem): Observable<boolean> {
    if (this.products.length) {
      return of(this.isProductAvailableInStore(cartItem));
    } else {
      return of(false);
    }
  }

  getProductAmount(product: Product): number {
    const storeProduct = this.products.find(
      (storeProduct) => storeProduct.id === product.id
    );
    return storeProduct ? storeProduct.availableAmount : 0;
  }

  getProductPrice(cartItem: CartItem): number {
    const storeProduct = this.products.find(
      (storeProduct) => storeProduct.id === cartItem.id
    );
    return storeProduct ? storeProduct.price : 0;
  }

  private isProductAvailableInStore(cartItem: CartItem): boolean {
    const storeProduct = this.products.find(
      (storeProduct) => storeProduct.id === cartItem.id
    );
    return storeProduct
      ? storeProduct.availableAmount >= cartItem.quantity
      : false;
  }

  checkIfMinimalQuantityReached(cartItem: CartItem): Observable<boolean> {
    const storeProduct = this.products.find(
      (storeProduct) => storeProduct.id === cartItem.id
    );
    return of(
      storeProduct ? storeProduct.minOrderAmount <= cartItem.quantity : false
    );
  }

  reduceCartItemQuantity(): void {
    /* If the cart has more items than available, then it reduces the quantity, 
      and also decrements store value 
    */
    if (this._initialized()) return;
    this._cart.update((currentCart) => {
      for (const cartItem of currentCart) {
        const availableAmount = this.getProductAmount(cartItem);
        if (cartItem.quantity >= availableAmount) {
          cartItem.quantity = availableAmount;
        }
        this.decrementProductAmount(cartItem, cartItem.quantity);
      }

      this.saveCartToStorage();
      return currentCart;
    });
  }

  syncCartWithStorePrice(): void {
    if (this._initialized()) return;
    const updatedCart = this.cart.map((cartItem) => {
      cartItem.price = this.getProductPrice(cartItem);
      return cartItem;
    });

    this.saveCartToStorage(updatedCart);
    this._cart.set(updatedCart);
  }
}
