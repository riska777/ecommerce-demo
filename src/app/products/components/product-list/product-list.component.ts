import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DataViewModule } from 'primeng/dataview';
import { SelectItem } from 'primeng/api';
import { SelectModule } from 'primeng/select';
import { SelectButtonModule } from 'primeng/selectbutton';

import { ProductListItemComponent } from '../product-list-item/product-list-item.component';
import { ProductListGridItemComponent } from '../product-list-grid-item/product-list-grid-item.component';
import { StoreService } from '../../../shared/services/store.service';
import { Product } from '../../interfaces/product.interface';
import { CartService } from '../../../cart/services/cart.service';
import { SharedUtils } from '../../../shared/utils/shared.utils';

@Component({
  selector: 'app-product-list',
  imports: [
    ProductListItemComponent,
    ProductListGridItemComponent,
    DataViewModule,
    SelectModule,
    SelectButtonModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  layout: 'list' | 'grid' = 'list';
  options = ['list', 'grid'];
  sortOptions: SelectItem[] = [
    { label: 'Price High to Low', value: '!price' },
    { label: 'Price Low to High', value: 'price' },
  ];
  sortOrder!: number;
  sortKey!: string;

  readonly sharedUtils = SharedUtils;

  constructor(
    private cartService: CartService,
    readonly storeService: StoreService
  ) {}

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortKey = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortKey = value;
    }
  }

  addToCart(product: Product) {
    if (this.storeService.isProductAvailable(product, 1)) {
      this.cartService.addToCart(product, 1);
    } else {
      console.log('Product is not available');
    }
  }
}
