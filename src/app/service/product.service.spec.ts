import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { Product } from '../store/models/product.model';
describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const mockProducts: Product[] = [
    {
      id: 1,
      title: 'Product 1',
      price: 100,
      category: 'electronics',
      image: 'product1.jpg',
      description: 'Test product 1'
    },
    {
      id: 2,
      title: 'Product 2',
      price: 200,
      category: 'fashion',
      image: 'product2.jpg',
      description: 'Test product 2'
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifies that no unmatched requests remain
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all products', () => {
    service.getProducts().subscribe((products) => {
      expect(products.length).toBe(2);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('https://fakestoreapi.com/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should add a product', () => {
    const newProduct: Product = {
      id: 3,
      title: 'New Product',
      price: 300,
      category: 'books',
      image: 'new.jpg',
      description: 'Newly added product'
    };

    service.addProduct(newProduct).subscribe((product) => {
      expect(product).toEqual(newProduct);
    });

    const req = httpMock.expectOne('https://fakestoreapi.com/products');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newProduct);
    req.flush(newProduct);
  });

  it('should update a product', () => {
    const updatedProduct: Product = {
      id: 1,
      title: 'Updated Product',
      price: 150,
      category: 'electronics',
      image: 'updated.jpg',
      description: 'Updated description'
    };

    service.updateProduct(updatedProduct).subscribe((product) => {
      expect(product).toEqual(updatedProduct);
    });

    const req = httpMock.expectOne(`https://fakestoreapi.com/products/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedProduct);
    req.flush(updatedProduct);
  });

});
