import { TestBed } from '@angular/core/testing';
import { StoreService } from './store.service';
import { Product } from '../../products/interfaces/product.interface';

describe('StoreService', () => {
  const mockProduct: Product = {
    id: '1',
    name: 'Test Product 1',
    availableAmount: 10,
    img: 'img1.jpg',
    minOrderAmount: 1,
    price: 100,
  };

  let service: StoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('setProducts', () => {
    it('should set products if products array is empty', () => {
      const products: Product[] = [
        { ...mockProduct },
        { ...mockProduct, id: "2", name: 'Product 2', price: 200, availableAmount: 20, minOrderAmount: 1 },
      ];

      service.setProducts(products);

      expect(service.products()).toEqual(products);
    });

    it('should not set products if products array is not empty', () => {
      const initialProducts: Product[] = [
        { ...mockProduct },
      ];
      const newProducts: Product[] = [
        { ...mockProduct, id: "2", name: 'Product 2', price: 200, availableAmount: 20, minOrderAmount: 1 },
      ];

      service.setProducts(initialProducts);
      service.setProducts(newProducts);

      expect(service.products()).toEqual(initialProducts);
    });
  });
});