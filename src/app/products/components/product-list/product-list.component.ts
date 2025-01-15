import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DataViewModule } from 'primeng/dataview';
import { SelectItem } from 'primeng/api';
import { SelectModule } from 'primeng/select';
import { SelectButtonModule } from 'primeng/selectbutton';

import { ProductsService } from '../../services/products.service';
import { Product } from '../../interfaces/product.interface';
import { ProductListItemComponent } from '../product-list-item/product-list-item.component';
import { ProductListGridItemComponent } from '../product-list-grid-item/product-list-grid-item.component';

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
export class ProductListComponent implements OnInit {
  products = signal<Product[]>([]);
  layout: 'list' | 'grid' = 'list';
  options = ['list', 'grid'];
  sortOptions: SelectItem[] = [
    { label: 'Price High to Low', value: '!price' },
    { label: 'Price Low to High', value: 'price' },
  ];
  sortOrder!: number;
  sortKey!: string;

  constructor(private productsService: ProductsService) {}

  ngOnInit() {
    this.productsService.getProducts().subscribe((products) => {
      this.products.set(products);
    });
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
}
