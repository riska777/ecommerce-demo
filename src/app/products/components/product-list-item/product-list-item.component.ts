import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { CommonModule } from '@angular/common';

import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { ProductUtils } from '../../utils/product.utils';

@Component({
  selector: 'app-product-list-item',
  imports: [CommonModule, TagModule, ButtonModule],
  templateUrl: './product-list-item.component.html',
  styleUrl: './product-list-item.component.scss',
})
export class ProductListItemComponent {
  @Input() product!: Product;
  @Input() first!: boolean;

  @Output() onAddToCart: EventEmitter<Product> = new EventEmitter<Product>();

  productUtils = ProductUtils;

  addToCart(product: Product) {
    this.onAddToCart.emit(product);
  }
}
