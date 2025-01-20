import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { StoreService } from '../../shared/services/store.service';
import { Product } from '../../products/interfaces/product.interface';
import { CartItem } from '../interfaces/cart-item.interface';

describe('CartService', () => {
  let service: CartService;
  let storeServiceSpy: jasmine.SpyObj<StoreService>;

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
    const spy = jasmine.createSpyObj('StoreService', [
      'decrementProductAmount',
      'saveCartToStorage',
    ]);
    spy._cart = {
      update: jasmine.createSpy('update'),
      set: jasmine.createSpy('set'),
    };

    TestBed.configureTestingModule({
      providers: [CartService, { provide: StoreService, useValue: spy }],
    });

    service = TestBed.inject(CartService);
    storeServiceSpy = TestBed.inject(
      StoreService
    ) as jasmine.SpyObj<StoreService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a product to the cart', () => {
    const product: Product = { ...mockProduct };
    const quantity = 2;
    const currentCart: CartItem[] = [];

    (storeServiceSpy._cart.update as jasmine.Spy).and.callFake(
      (callback: (cart: CartItem[]) => CartItem[]) => {
        const updatedCart = callback(currentCart);
        expect(updatedCart.length).toBe(1);
        expect(updatedCart[0].id).toBe(product.id);
        expect(updatedCart[0].quantity).toBe(quantity);
        return updatedCart;
      }
    );

    service.addToCart(product, quantity);

    expect(storeServiceSpy._cart.update).toHaveBeenCalled();
    expect(storeServiceSpy.decrementProductAmount).toHaveBeenCalledWith(
      product,
      quantity
    );
    expect(storeServiceSpy.saveCartToStorage).toHaveBeenCalled();
  });

  it('should update the quantity of an existing product in the cart', () => {
    const product: Product = { ...mockProduct };
    const quantity = 2;
    const currentCart: CartItem[] = [{ ...mockCartItem, quantity: 1 }];

    (storeServiceSpy._cart.update as jasmine.Spy).and.callFake(
      (callback: (cart: CartItem[]) => CartItem[]) => {
        const updatedCart = callback(currentCart);
        expect(updatedCart.length).toBe(1);
        expect(updatedCart[0].id).toBe(product.id);
        expect(updatedCart[0].quantity).toBe(3);
        return updatedCart;
      }
    );

    service.addToCart(product, quantity);

    expect(storeServiceSpy._cart.update).toHaveBeenCalled();
    expect(storeServiceSpy.decrementProductAmount).toHaveBeenCalledWith(
      product,
      quantity
    );
    expect(storeServiceSpy.saveCartToStorage).toHaveBeenCalled();
  });

  it('should remove a product from the cart', () => {
    const product: CartItem = { ...mockCartItem };

    const currentCart: CartItem[] = [{ ...product }];

    (storeServiceSpy._cart.update as jasmine.Spy).and.callFake(
      (callback: (cart: CartItem[]) => CartItem[]) => {
        const updatedCart = callback(currentCart);
        expect(updatedCart.length).toBe(0);
        return updatedCart;
      }
    );

    service.removeFromCart(product);

    expect(storeServiceSpy._cart.update).toHaveBeenCalled();
    expect(storeServiceSpy.saveCartToStorage).toHaveBeenCalled
  });

  it('should clear the cart', () => {
    service.clearCart();

    expect(storeServiceSpy._cart.set).toHaveBeenCalledWith([]);
    expect(storeServiceSpy.saveCartToStorage).toHaveBeenCalled();
  });

  it('should calculate the total price of the cart', () => {
    const currentCart: CartItem[] = [
      { ...mockCartItem, quantity: 1, price: 200 },
      { ...mockCartItem, id: '2', quantity: 2 },
    ];

    (storeServiceSpy.cart as CartItem[]) = currentCart;

    const totalPrice = service.cartTotalPrice();

    expect(totalPrice).toBe(400);
  });
});
