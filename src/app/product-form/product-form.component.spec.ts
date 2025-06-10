import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFormComponent } from './product-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { Product } from '../store/models/product.model';
import { addProduct, loadProducts, updateProduct } from '../store/actions/product.actions';
import { selectProductById } from '../store/selectors/products/product.selectors';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let store: MockStore;
  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let dispatchSpy: jasmine.Spy;

  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 100,
    category: 'Test Category',
    image: 'test.jpg',
    description:"description"
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ProductFormComponent],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectProductById(1),
              value: mockProduct
            }
          ]
        }),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1' // simulate route param
              }
            }
          }
        },
        {
          provide: Router,
          useValue: routerSpy
        }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadProducts on init', () => {
    expect(dispatchSpy).toHaveBeenCalledWith(loadProducts());
  });

  it('should populate form if editing product is available', (done) => {
    component.product$.subscribe(product => {
      expect(product).toEqual(mockProduct);
      expect(component.productForm.value.title).toEqual(mockProduct.title);
      done();
    });
  });

  it('should dispatch updateProduct when editing', () => {
    component.editingProduct = mockProduct;
    component.productForm.patchValue({
      title: 'Updated Title',
      price: 200,
      category: 'Updated Category',
      image: 'updated.png'
    });

    component.onSubmit();

    expect(dispatchSpy).toHaveBeenCalledWith(updateProduct({
      product: {
        id: mockProduct.id,
        changes: {
          title: 'Updated Title',
          price: 200,
          category: 'Updated Category',
          image: 'updated.png'
        }
      }
    }));
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should dispatch addProduct when not editing', () => {
    component.editingProduct = null;
    component.productForm.patchValue({
      title: 'New Product',
      price: 300,
      category: 'New Category',
      image: 'new.png'
    });

    component.onSubmit();

    expect(dispatchSpy).toHaveBeenCalledWith(addProduct({
      product: {
       id: 1,
    title: 'Test Product',
    price: 100,
    category: 'Test Category',
    image: 'test.jpg',
    description:"description"
      }
    }));
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  });
});
