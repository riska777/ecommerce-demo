import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { ProductUtils } from '../../../products/utils/product.utils';
import { CartItem } from '../../interfaces/cart-item.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-list-item',
  imports: [TagModule, ButtonModule, CommonModule],
  templateUrl: './cart-list-item.component.html',
  styleUrl: './cart-list-item.component.scss'
})
export class CartListItemComponent {
  @Input() product!: CartItem;
  @Input() first!: boolean;

  @Output() onRemoveFromCart: EventEmitter<CartItem> = new EventEmitter<CartItem>();

  productUtils = ProductUtils;

  removeFromCart(): void {
    this.onRemoveFromCart.emit(this.product);
  }
}
