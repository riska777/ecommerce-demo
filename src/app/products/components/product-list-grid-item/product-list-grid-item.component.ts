import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../interfaces/product.interface';

import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ProductUtils } from '../../utils/product.utils';

@Component({
  selector: 'app-product-list-grid-item',
  imports: [TagModule, ButtonModule, CommonModule],
  templateUrl: './product-list-grid-item.component.html',
  styleUrl: './product-list-grid-item.component.scss',
})
export class ProductListGridItemComponent {
  @Input() product!: Product;
  @Input() first!: boolean;

  @Output() onAddToCart: EventEmitter<Product> = new EventEmitter<Product>();

  productUtils = ProductUtils;

  addToCart(): void {
    this.onAddToCart.emit(this.product);
  }
}
