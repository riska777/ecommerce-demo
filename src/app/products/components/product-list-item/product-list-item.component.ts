import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { CommonModule } from '@angular/common';

import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-product-list-item',
  imports: [CommonModule, TagModule, ButtonModule],
  templateUrl: './product-list-item.component.html',
  styleUrl: './product-list-item.component.scss',
})
export class ProductListItemComponent {
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
    if (product.availableAmount < 100 ) {
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
