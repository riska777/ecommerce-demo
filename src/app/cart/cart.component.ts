import { Component } from '@angular/core';
import { CartService } from './services/cart.service';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';
import { CartListComponent } from './components/cart-list/cart-list.component';

@Component({
  selector: 'app-cart',
  imports: [CartListComponent, ButtonModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  constructor(readonly cartService: CartService) {}

  emptyCart(): void {
    this.cartService.clearCart();
  }
}
