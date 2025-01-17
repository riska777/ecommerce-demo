import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataViewModule } from 'primeng/dataview';

import { CartService } from '../../services/cart.service';
import { CartListItemComponent } from '../cart-list-item/cart-list-item.component';
import { CartItem } from '../../interfaces/cart-item.interface';
import { SharedUtils } from '../../../shared/utils/shared.utils';

@Component({
  selector: 'app-cart-list',
  imports: [CartListItemComponent, DataViewModule, CommonModule],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.scss',
})
export class CartListComponent {
  readonly sharedUtils = SharedUtils;

  constructor(
    readonly cartService: CartService
  ) {}

  removeFromCart(product: CartItem): void {
    this.cartService.removeFromCart(product);
  }

  cartTotalPrice(): number {
    return this.cartService.cartTotalPrice();
  }
}
