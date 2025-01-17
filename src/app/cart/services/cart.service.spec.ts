import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { StoreService } from '../../shared/services/store.service';
import { Product } from '../../products/interfaces/product.interface';
import { CartItem } from '../interfaces/cart-item.interface';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

describe('CartService', () => {
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

  let cartService: CartService;
  let storeService: jasmine.SpyObj<StoreService>;

  beforeEach(() => {
    const storeServiceSpy = jasmine.createSpyObj('StoreService', [
      'decrementProductAmount',
      'getProductAmount',
      'getProductPrice',
    ]);

    TestBed.configureTestingModule({
      imports: [BrowserModule],
      providers: [
        CartService,
        provideAnimations(),
        { provide: StoreService, useValue: storeServiceSpy },
      ],
    });

    cartService = TestBed.inject(CartService);
    storeService = TestBed.inject(StoreService) as jasmine.SpyObj<StoreService>;
    cartService.clearCart();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(CartService).toBeTruthy();
  });

  it('should add a product to the cart', () => {
    const product: Product = { ...mockProduct };
    cartService.addToCart(product, 2);
    expect(cartService.cart().length).toBe(1);
    expect(cartService.cart()[0].quantity).toBe(2);
    expect(storeService.decrementProductAmount).toHaveBeenCalledWith(
      product,
      2
    );
  });

  it('should remove a product from the cart', () => {
    const product: CartItem = { ...mockCartItem };
    cartService.addToCart(product, 2);
    cartService.removeFromCart(product);

    expect(cartService.cart().length).toBe(0);
  });

  it('should clear the cart', () => {
    const product: Product = { ...mockProduct };
    cartService.addToCart(product, 2);
    cartService.clearCart();

    expect(cartService.cart().length).toBe(0);
  });

  it('should reduce cart item quantity based on available amount', () => {
    const product: CartItem = { ...mockCartItem };
    const productQuantityAddedToCart = 5;
    cartService.addToCart(product, productQuantityAddedToCart);
    storeService.getProductAmount.and.returnValue(3);
    cartService.reduceCartItemQuantity();

    expect(cartService.cart()[0].quantity).toBe(3);
    expect(storeService.decrementProductAmount).toHaveBeenCalledWith(
      product,
      productQuantityAddedToCart
    );
  });

  it('should calculate the total price of the cart', () => {
    const product1: Product = { ...mockProduct };
    const product2: Product = {
      ...mockProduct,
      id: '2',
      name: 'Product 2',
      price: 200,
    };
    cartService.addToCart(product1, 2);
    cartService.addToCart(product2, 1);

    expect(cartService.cartTotalPrice()).toBe(400);
  });

  it('should sync product prices with the store', () => {
    const product: CartItem = { ...mockCartItem};
    storeService.getProductPrice.and.returnValue(150);
    cartService.addToCart(product, 2);
    cartService.syncProductPriceWithStore();

    expect(cartService.cart()[0].price).toBe(150);
  });
});
