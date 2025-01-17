import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartListItemComponent } from './cart-list-item.component';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('CartListItemComponent', () => {
  let component: CartListItemComponent;
  let fixture: ComponentFixture<CartListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartListItemComponent, BrowserModule],
      providers: [provideAnimations()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
