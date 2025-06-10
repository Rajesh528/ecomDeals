import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductFormComponent } from './product-form.component';
import { Store, StoreModule } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { addProduct, loadProducts, updateProduct } from '../store/actions/product.actions';
import { Product } from '../store/models/product.model';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let store: jasmine.SpyObj<Store>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ProductFormComponent],
      providers: [
        { provide: Store, useValue: storeSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => null  // simulate no ID for add flow
              }
            }
          }
        },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store) as jasmine.SpyObj<Store>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    store.select.and.returnValue(of(undefined)); // no existing product
    fixture.detectChanges(); // triggers ngOnInit
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should patch form values on edit()', () => {
    const mockProduct: Product = {
      id: 1,
      title: 'Test Product',
      price: 100,
      category: 'electronics',
      image: 'test.jpg',
      description: 'A test product'
    };

    component.edit(mockProduct);
    expect(component.productForm.value).toEqual({
      title: 'Test Product',
      price: 100,
      category: 'electronics',
      image: 'test.jpg',
      description: 'A test product'
    });
  });

  it('should dispatch updateProduct if editingProduct is set', () => {
    const mockProduct: Product = {
      id: 2,
      title: 'Updated Product',
      price: 200,
      category: 'gadgets',
      image: 'updated.jpg',
      description: 'Updated description'
    };

    component.edit(mockProduct);

    component.productForm.setValue({
      title: 'Updated Product',
      price: 200,
      category: 'gadgets',
      image: 'updated.jpg',
      description: 'Updated description'
    });

    component.onSubmit();

    expect(store.dispatch).toHaveBeenCalledWith(updateProduct({
      product: {
        id: 2,
        changes: {
          title: 'Updated Product',
          price: 200,
          category: 'gadgets',
          image: 'updated.jpg',
          description: 'Updated description'
        }
      }
    }));
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });
});
