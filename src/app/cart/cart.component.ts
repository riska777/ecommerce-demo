import { Component } from '@angular/core';
import { CartService } from './services/cart.service';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { CartListComponent } from './components/cart-list/cart-list.component';
import { StoreService } from '../shared/services/store.service';

@Component({
  selector: 'app-cart',
  imports: [CartListComponent, ButtonModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  constructor(
    readonly cartService: CartService,
    readonly storeService: StoreService
  ) {
    this.storeService.loadProducts();
  }

  emptyCart(): void {
    this.cartService.clearCart();
  }

  reduceCartItemQuantity(): void {
    this.storeService.reduceCartItemQuantity();
  }
}
