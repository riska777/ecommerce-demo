import { TestBed } from '@angular/core/testing';
import { StoreService } from './store.service';
import { ProductsService } from '../../products/services/products.service';
import { of } from 'rxjs';
import { Product } from '../../products/interfaces/product.interface';
import { CartItem } from '../../cart/interfaces/cart-item.interface';

describe('StoreService', () => {
  let service: StoreService;
  let productsServiceSpy: jasmine.SpyObj<ProductsService>;

  const mockProduct: Product = {
    id: '1',
    name: 'Test Product 1',
    availableAmount: 10,
    img: 'img1.jpg',
    minOrderAmount: 1,
    price: 100,
  };

  const mockCartItem: CartItem = {
    id: '1',
    name: 'Test Product 1',
    availableAmount: 10,
    img: 'img1.jpg',
    minOrderAmount: 1,
    price: 100,
    quantity: 2,
  };

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ProductsService', ['getProducts']);

    TestBed.configureTestingModule({
      providers: [
        StoreService,
        { provide: ProductsService, useValue: spy },
      ],
    });

    service = TestBed.inject(StoreService);
    productsServiceSpy = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load cart from localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify([{ ...mockCartItem }]));
    service['loadCart']();
    expect(service.cart).toEqual([{ ...mockCartItem }]);
  });

  it('should save cart to localStorage', () => {
    const setItemSpy = spyOn(localStorage, 'setItem');
    service.saveCartToStorage([{ ...mockCartItem }]);
    expect(setItemSpy).toHaveBeenCalledWith('ecommerce-app-cart', JSON.stringify([{ ...mockCartItem }]));
  });

  it('should load products', () => {
    const mockProducts: Product[] = [{ ...mockProduct }];
    productsServiceSpy.getProducts.and.returnValue(of(mockProducts));
    service.loadProducts();
    expect(service.products).toEqual(mockProducts);
  });

  it('should check if product is available', () => {
    const product: Product = { ...mockProduct };
    service['_products'].set([product]);
    expect(service.isProductAvailable(product, 5)).toBeTrue();
    expect(service.isProductAvailable(product, 15)).toBeFalse();
  });

  it('should decrement product amount', () => {
    const product: Product = { ...mockProduct };
    service['_products'].set([product]);
    service['decrementProductAmount'](product, 5);
    expect(service.getProductAmount(product)).toEqual(5);
  });

  it('should check available quantity in cart', () => {
    const cartItem: CartItem = { ...mockCartItem, quantity: 5 };
    const mockProducts: Product[] = [{ ...mockProduct, availableAmount: 10 }];
    service['_products'].set(mockProducts);
    service.checkAvailableQuantity(cartItem).subscribe((isAvailable) => {
      expect(isAvailable).toBeTrue();
    });
  });

  it('should get product amount', () => {
    const product: Product = { ...mockProduct, availableAmount: 10 };
    service['_products'].set([product]);
    expect(service.getProductAmount(product)).toEqual(10);
  });

  it('should get product price', () => {
    const cartItem: CartItem = { ...mockCartItem };
    const product: Product = { ...mockProduct };
    service['_products'].set([product]);
    expect(service.getProductPrice(cartItem)).toEqual(100);
  });

  it('should check if minimal quantity is reached', () => {
    const cartItem: CartItem = { ...mockCartItem};
    const product: Product = { ...mockProduct };
    service['_products'].set([product]);
    service.checkIfMinimalQuantityReached(cartItem).subscribe((isReached) => {
      expect(isReached).toBeTrue();
    });
  });

  it('should reduce cart item quantity', () => {
    const cartItem: CartItem = { ...mockCartItem, quantity: 15 };
    const product: Product = { ...mockProduct, availableAmount: 10 };
    service['_products'].set([product]);
    service['_cart'].set([cartItem]);
    service.reduceCartItemQuantity();
    expect(service.cart[0].quantity).toEqual(10);
  });

  it('should sync cart with store price', () => {
    const cartItem: CartItem = { ...mockCartItem, quantity: 5, price: 50 };
    const product: Product = { ...mockProduct, availableAmount: 10 };
    service['_products'].set([product]);
    service['_cart'].set([cartItem]);
    service.syncCartWithStorePrice();
    expect(service.cart[0].price).toEqual(100);
  });
});