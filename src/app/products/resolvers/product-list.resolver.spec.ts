import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';

import { productListResolver } from './product-list.resolver';
import { of } from 'rxjs';
import { ProductsService } from '../services/products.service';
import { StoreService } from '../../shared/services/store.service';
import { CartService } from '../../cart/services/cart.service';

describe('productListResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => productListResolver(...resolverParameters));

  const mockProducts = [{
    id: '1',
    name: 'Product 1',
    img: 'image-url',
    availableAmount: 10,
    minOrderAmount: 1,
    price: 100
  }];

  let productsService: jasmine.SpyObj<ProductsService>;
  let storeService: jasmine.SpyObj<StoreService>;
  let cartService: jasmine.SpyObj<CartService>;

  beforeEach(() => {
    const productsServiceSpy = jasmine.createSpyObj('ProductsService', ['getProducts']);
    const storeServiceSpy = jasmine.createSpyObj('StoreService', ['products', 'setProducts']);
    const cartServiceSpy = jasmine.createSpyObj('CartService', ['reduceCartItemQuantity', 'syncProductPriceWithStore']);

    TestBed.configureTestingModule({
      providers: [
        { provide: ProductsService, useValue: productsServiceSpy },
        { provide: StoreService, useValue: storeServiceSpy },
        { provide: CartService, useValue: cartServiceSpy }
      ]
    });

    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    storeService = TestBed.inject(StoreService) as jasmine.SpyObj<StoreService>;
    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });

  it('should fetch products if store is empty and set them in store', async () => {
    storeService.products.and.returnValue([]);
    productsService.getProducts.and.returnValue(of(mockProducts));

    const mockActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const mockRouterStateSnapshot = {} as RouterStateSnapshot;
    const result = await executeResolver(mockActivatedRouteSnapshot, mockRouterStateSnapshot);

    expect(productsService.getProducts).toHaveBeenCalled();
    expect(storeService.setProducts).toHaveBeenCalledWith(mockProducts);
    expect(cartService.reduceCartItemQuantity).toHaveBeenCalled();
    expect(cartService.syncProductPriceWithStore).toHaveBeenCalled();
    expect(result).toBeTrue();
  });

  it('should not fetch products if store is not empty', async () => {
    storeService.products.and.returnValue(mockProducts);

    const mockActivatedRouteSnapshot = {} as ActivatedRouteSnapshot;
    const mockRouterStateSnapshot = {} as RouterStateSnapshot;
    const result = await executeResolver(mockActivatedRouteSnapshot, mockRouterStateSnapshot);

    expect(productsService.getProducts).not.toHaveBeenCalled();
    expect(storeService.setProducts).not.toHaveBeenCalled();
    expect(cartService.reduceCartItemQuantity).not.toHaveBeenCalled();
    expect(cartService.syncProductPriceWithStore).toHaveBeenCalled();
    expect(result).toBeTrue();
  });
});
