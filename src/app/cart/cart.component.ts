import { Component } from '@angular/core';
import { CartService } from './services/cart.service';
import { CommonModule } from '@angular/common';

import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-cart',
  imports: [ButtonModule, CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent {
  constructor(readonly cartService: CartService) {}

  emptyCart(): void {
    this.cartService.clearCart();
  }
}
