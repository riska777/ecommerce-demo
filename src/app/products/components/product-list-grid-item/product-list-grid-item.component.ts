import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';

import { Product } from '../../interfaces/product.interface';
import { ProductUtils } from '../../utils/product.utils';
import { AddToCartEventInterface } from '../../interfaces/add-to-cart-event.interface';

@Component({
  selector: 'app-product-list-grid-item',
  imports: [TagModule, ButtonModule, CommonModule],
  templateUrl: './product-list-grid-item.component.html',
  styleUrl: './product-list-grid-item.component.scss',
})
export class ProductListGridItemComponent implements OnInit {
  @Input() product!: Product;
  @Input() first!: boolean;

  @Output() onAddToCart: EventEmitter<AddToCartEventInterface> =
    new EventEmitter<AddToCartEventInterface>();

  productUtils = ProductUtils;
  quantity = 0;

  ngOnInit(): void {
    this.quantity = this.product?.availableAmount > 0 ? 1 : 0;
  }

  addToCart(): void {
    if (!this.quantity) return;
    this.onAddToCart.emit({ product: this.product, quantity: this.quantity });
  }
}
