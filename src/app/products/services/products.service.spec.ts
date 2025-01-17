import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Product } from '../interfaces/product.interface';
import { provideHttpClient } from '@angular/common/http';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(), provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products as an Observable', () => {
    const dummyProducts: Product[] = [
      { id: '1', name: 'Product 1', price: 100, img: 'img1.jpg', availableAmount: 10, minOrderAmount: 1 },
      { id: '2', name: 'Product 2', price: 200, img: 'img2.jpg', availableAmount: 20, minOrderAmount: 2 }
    ];

    service.getProducts().subscribe(products => {
      expect(products.length).toBe(2);
      expect(products).toEqual(dummyProducts);
    });

    const req = httpMock.expectOne("https://cas5-0-urlprotect.trendmicro.com:443/wis/clicktime/v1/query?url=https%3a%2f%2f63c10327716562671870f959.mockapi.io%2fproducts&umid=edab3d48-7a50-4ca6-b6c9-9362af456f60&auth=3bd1ed0ea25e030aebac2180cda48b2d7a1ccc30-bf53e959aa381ef3b79ace2237ee4d9545bb0e5b");
    expect(req.request.method).toBe('GET');
    req.flush(dummyProducts);
  });
});
