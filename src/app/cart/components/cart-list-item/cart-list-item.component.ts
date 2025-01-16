import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';

import { ProductUtils } from '../../../products/utils/product.utils';
import { CartItem } from '../../interfaces/cart-item.interface';
import { StoreService } from '../../../shared/services/store.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart-list-item',
  imports: [TagModule, ButtonModule, CommonModule, MessageModule, AsyncPipe],
  templateUrl: './cart-list-item.component.html',
  styleUrl: './cart-list-item.component.scss'
})
export class CartListItemComponent {
  @Input() product!: CartItem;
  @Input() first!: boolean;

  @Output() onRemoveFromCart: EventEmitter<CartItem> = new EventEmitter<CartItem>();

  productUtils = ProductUtils;

  constructor(private storeService: StoreService) {}

  removeFromCart(): void {
    this.onRemoveFromCart.emit(this.product);
  }

  checkAvailableQuantity(): Observable<boolean> {
    return this.storeService.checkAvailableQuantity(this.product);
  }

  checkIfMinimalQuantityReached(): Observable<boolean> {
    return this.storeService.checkIfMinimalQuantityReached(this.product);
  }
}
