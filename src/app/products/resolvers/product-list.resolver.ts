import { ResolveFn } from '@angular/router';
import { ProductsService } from '../services/products.service';
import { StoreService } from '../../shared/services/store.service';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CartService } from '../../cart/services/cart.service';

export const productListResolver: ResolveFn<boolean> = async (route, state) => {
  const productsService = inject(ProductsService);
  const cart = inject(CartService);
  const store = inject(StoreService);

  if (store.products().length === 0) {
    const products = await firstValueFrom(productsService.getProducts());
    store.setProducts(products);
    cart.reduceCartItemQuantity();
    cart.syncProductPriceWithStore();
  }

  return true;
};
