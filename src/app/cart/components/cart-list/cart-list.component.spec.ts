import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartListComponent } from './cart-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CartService } from '../../services/cart.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('CartListComponent', () => {
  let component: CartListComponent;
  let fixture: ComponentFixture<CartListComponent>;
  let cartService: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    const cartServiceSpy = jasmine.createSpyObj('CartService', [
      'cart',
      'cartTotalPrice',
    ]);

    await TestBed.configureTestingModule({
      imports: [CartListComponent, BrowserModule],
      providers: [
        provideAnimations(),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: CartService, useValue: cartServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CartListComponent);
    component = fixture.componentInstance;
    cartService = TestBed.inject(CartService) as jasmine.SpyObj<CartService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return total price from cartService', () => {
    const expectedTotalPrice = 100;
    cartService.cartTotalPrice.and.returnValue(expectedTotalPrice);

    const totalPrice = component.cartTotalPrice();

    expect(totalPrice).toBe(expectedTotalPrice);
    expect(cartService.cartTotalPrice).toHaveBeenCalled();
  });
});
