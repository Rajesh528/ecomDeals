import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError, Subject } from 'rxjs';
import { ProductEffects } from './product.effects';
import * as ProductActions from '../actions/product.actions';
import { ProductService } from '../../service/product.service';
import { Product } from '../models/product.model';
import { Update } from '@ngrx/entity';

describe('ProductEffects', () => {
  let actions$: Observable<any>;
  let effects: ProductEffects;
  let productService: jasmine.SpyObj<ProductService>;
  let actionsSubject: Subject<any>;

  const mockProducts: Product[] = [
    { id: 1, title: 'Test', price: 100, category: 'Books', image: 'img.jpg', description: 'desc' }
  ];

  beforeEach(() => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts', 'addProduct']);

    actionsSubject = new Subject<any>();
    actions$ = actionsSubject.asObservable();

    TestBed.configureTestingModule({
      providers: [
        ProductEffects,
        provideMockActions(() => actions$),
        { provide: ProductService, useValue: productServiceSpy }
      ]
    });

    effects = TestBed.inject(ProductEffects);
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
  });

  // ✅ Test: loadProducts$
  it('should dispatch loadProductsSuccess on success', (done) => {
    productService.getProducts.and.returnValue(of(mockProducts));

    actionsSubject.next(ProductActions.loadProducts());

    effects.loadProducts$.subscribe(action => {
      expect(action).toEqual(ProductActions.loadProductsSuccess({ products: mockProducts }));
      done();
    });
  });

  it('should dispatch loadProductsFailure on error', (done) => {
    productService.getProducts.and.returnValue(throwError(() => new Error('API error')));

    actionsSubject.next(ProductActions.loadProducts());

    effects.loadProducts$.subscribe(action => {
      expect(action).toEqual(ProductActions.loadProductsFailure({ error: 'unable to load the products' }));
      done();
    });
  });

  // ✅ Test: addProduct$
  it('should dispatch addProductSuccess on success', (done) => {
    const newProduct: Product = {
      id: 2, title: 'New', price: 150, category: 'Toys', image: 'toy.jpg', description: 'desc'
    };

    productService.addProduct.and.returnValue(of(newProduct));

    actionsSubject.next(ProductActions.addProduct({ product: newProduct }));

    effects.addProduct$.subscribe(action => {
      expect(action).toEqual(ProductActions.addProductSuccess({ product: newProduct }));
      done();
    });
  });

  it('should dispatch addProductFailure on error', (done) => {
    const newProduct: Product = {
      id: 2, title: 'New', price: 150, category: 'Toys', image: 'toy.jpg', description: 'desc'
    };

    productService.addProduct.and.returnValue(throwError(() => new Error('Add failed')));

    actionsSubject.next(ProductActions.addProduct({ product: newProduct }));

    effects.addProduct$.subscribe(action => {
      expect(action).toEqual(ProductActions.addProductFailure({ error: 'Add failed' }));
      done();
    });
  });

  // ✅ Test: updateProduct$
  it('should dispatch updateProductSuccess with update object', (done) => {
    const update = {
      id: 1,
      changes: {
        title: 'Updated Title'
      }
    };

    actionsSubject.next(ProductActions.updateProduct({ product: update }));

    effects.updateProduct$.subscribe(action => {
      expect(action).toEqual(ProductActions.updateProductSuccess({ product: update }));
      done();
    });
  });
});
