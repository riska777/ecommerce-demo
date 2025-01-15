import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListGridItemComponent } from './product-list-grid-item.component';

describe('ProductListGridItemComponent', () => {
  let component: ProductListGridItemComponent;
  let fixture: ComponentFixture<ProductListGridItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductListGridItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductListGridItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
