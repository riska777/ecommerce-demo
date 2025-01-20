import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { StoreService } from '../../../shared/services/store.service';
import { CartService } from '../../../cart/services/cart.service';
import { AddToCartEventInterface } from '../../interfaces/add-to-cart-event.interface';
import { Product } from '../../interfaces/product.interface';

describe('ProductListComponent', () => {
  const mockProduct: Product = {
    id: '1',
    name: 'Test Product 1',
    availableAmount: 10,
    img: 'img1.jpg',
    minOrderAmount: 1,
    price: 100,
  };

  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let storeService: jasmine.SpyObj<StoreService>;
  let cartService: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    const storeServiceSpy = jasmine.createSpyObj('StoreService', [
      'isProductAvailable',
      'loadProducts'
    ]);
    const cartServiceSpy = jasmine.createSpyObj('CartService', ['addToCart']);

    await TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: StoreService, useValue: storeServiceSpy },
        { provide: CartService, useValue: cartServiceSpy },
      ],
      imports: [ProductListComponent],
    }).compileComponents();

    storeServiceSpy.products = [{ ...mockProduct }];
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    storeService = TestBed.inject(StoreService) as jasmine.SpyObj<StoreService>;
    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add product to cart if available', () => {
    const addToCartEvent: AddToCartEventInterface = {
      product: { ...mockProduct },
      quantity: 1,
    };

    storeService.isProductAvailable.and.returnValue(true);

    component.addToCart(addToCartEvent);

    expect(storeService.isProductAvailable).toHaveBeenCalledWith(
      addToCartEvent.product,
      addToCartEvent.quantity
    );
    expect(cartService.addToCart).toHaveBeenCalledWith(
      addToCartEvent.product,
      addToCartEvent.quantity
    );
  });

  it('should not add product to cart if not available', () => {
    const addToCartEvent: AddToCartEventInterface = {
      product: { ...mockProduct },
      quantity: 1,
    };

    storeService.isProductAvailable.and.returnValue(false);
    spyOn(console, 'log');

    component.addToCart(addToCartEvent);

    expect(storeService.isProductAvailable).toHaveBeenCalledWith(
      addToCartEvent.product,
      addToCartEvent.quantity
    );
    expect(cartService.addToCart).not.toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith('Product is not available');
  });
});
