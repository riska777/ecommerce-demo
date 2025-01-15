import { Component, OnInit } from '@angular/core';
import { ProductsService } from './services/products.service';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'app-products',
  imports: [ButtonModule, PanelModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit() {
    this.productsService.getProducts().subscribe((products) => {
      console.log(products);
    });
  }
}
