import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product.interface';

import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list-grid-item',
  imports: [TagModule, ButtonModule, CommonModule],
  templateUrl: './product-list-grid-item.component.html',
  styleUrl: './product-list-grid-item.component.scss',
})
export class ProductListGridItemComponent {
  @Input() product!: Product;
  @Input() first!: boolean;

  availableAmountToStockLabel(product: Product): string {
    if (product.availableAmount === undefined) {
      return 'Out of stock';
    }
    if (product.availableAmount === 0) {
      return 'Out of stock';
    }
    if (product.availableAmount < 100) {
      return 'Low stock';
    }
    if (product.availableAmount >= 100) {
      return 'In stock';
    }
    return 'Out of stock';
  }

  getSeverity(product: Product): 'success' | 'warn' | 'danger' | undefined {
    if (product.availableAmount === undefined) {
      return undefined;
    }
    if (product.availableAmount < 100) {
      return 'warn';
    }
    if (product.availableAmount === 0) {
      return 'danger';
    }
    if (product.availableAmount >= 100) {
      return 'success';
    }
    return;
  }
}
