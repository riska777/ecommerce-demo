import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../interfaces/product.interface';
import { CommonModule } from '@angular/common';

import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';

import { ProductUtils } from '../../utils/product.utils';
import { AddToCartEventInterface } from '../../interfaces/add-to-cart-event.interface';

@Component({
  selector: 'app-product-list-item',
  imports: [
    CommonModule,
    TagModule,
    ButtonModule,
    FormsModule,
    InputNumberModule
  ],
  templateUrl: './product-list-item.component.html',
  styleUrl: './product-list-item.component.scss',
})
export class ProductListItemComponent {
  @Input() product!: Product;
  @Input() first!: boolean;

  @Output() onAddToCart: EventEmitter<AddToCartEventInterface> =
    new EventEmitter<AddToCartEventInterface>();

  productUtils = ProductUtils;
  quantity = this.product?.availableAmount > 0 ? 1 : 0;

  addToCart(): void {
    this.onAddToCart.emit({ product: this.product, quantity: this.quantity });
  }
}
