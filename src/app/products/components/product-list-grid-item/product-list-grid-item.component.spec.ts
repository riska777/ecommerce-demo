import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListGridItemComponent } from './product-list-grid-item.component';
import { Product } from '../../interfaces/product.interface';

describe('ProductListGridItemComponent', () => {
  let component: ProductListGridItemComponent;
  let fixture: ComponentFixture<ProductListGridItemComponent>;

  const mockProduct: Product = {
    id: '1',
    name: 'Test Product 1',
    availableAmount: 10,
    img: 'img1.jpg',
    minOrderAmount: 1,
    price: 100,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListGridItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit onAddToCart event with correct payload when addToCart is called', () => {
    const product = { ...mockProduct };
    component.product = product;
    component.quantity = 2;

    spyOn(component.onAddToCart, 'emit');

    component.addToCart();

    expect(component.onAddToCart.emit).toHaveBeenCalledWith({
      product: component.product,
      quantity: component.quantity,
    });
  });

  it('should not emit onAddToCart event if quantity is zero', () => {
    const product = { ...mockProduct };
    component.product = product;
    component.quantity = 0;

    spyOn(component.onAddToCart, 'emit');

    component.addToCart();

    expect(component.onAddToCart.emit).not.toHaveBeenCalled();
  });
});
