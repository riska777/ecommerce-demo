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
import { AddToCartEventInterface } from '../../interfaces/add-to-cart-event.interface';
import { ProductsService } from '../../services/products.service';
import { SkeletonListComponent } from '../../../shared/skeletons/skeleton-list/skeleton-list.component';

@Component({
  selector: 'app-product-list',
  imports: [
    SkeletonListComponent,
    ProductListItemComponent,
    ProductListGridItemComponent,
    DataViewModule,
    SelectModule,
    SelectButtonModule,
    CommonModule,
    FormsModule
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
    private productsService: ProductsService,
    readonly storeService: StoreService
  ) {}

  ngOnInit() {
    if (!this.storeService.products()?.length) {
      this.productsService.getProducts().subscribe((products: Product[]) => {
        this.storeService.setProducts(products);
        this.cartService.reduceCartItemQuantity();
      });
    }
  }

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

  addToCart(addToCartEvent: AddToCartEventInterface) {
    if (this.storeService.isProductAvailable(addToCartEvent.product, addToCartEvent.quantity)) {
      this.cartService.addToCart(addToCartEvent.product, addToCartEvent.quantity);
    } else {
      console.log('Product is not available');
    }
  }
}
