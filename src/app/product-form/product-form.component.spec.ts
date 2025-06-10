import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFormComponent } from './product-form.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { Product } from '../store/models/product.model';
import { addProduct, loadProducts, updateProduct } from '../store/actions/product.actions';

describe('ProductFormComponent', () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;
  let storeSpy: jasmine.SpyObj<Store>;
  let routerSpy: jasmine.SpyObj<Router>;

  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 100,
    category: 'Test Category',
    image: 'test.jpg',
    description:"description"
  };

  const activatedRouteStub = {
    snapshot: {
      paramMap: convertToParamMap({ id: '1' })
    }
  } as Partial<ActivatedRoute>; // ✅ cast as Partial

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ProductFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Store, useValue: storeSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;

    (storeSpy.select as jasmine.Spy).and.returnValue(of(mockProduct));

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form and dispatch loadProducts on init', () => {
    expect(storeSpy.dispatch).toHaveBeenCalledWith(loadProducts());
    expect(component.productForm).toBeDefined();
    expect(component.productForm.controls['title'].value).toBe(mockProduct.title);
  });

  it('should populate form with product data when product is loaded', () => {
    expect(component.editingProduct).toEqual(mockProduct);
    expect(component.productForm.value.title).toEqual(mockProduct.title);
  });

  // it('should dispatch updateProduct if editingProduct exists on submit', () => {
  //   component.onSubmit();

  //   expect(storeSpy.dispatch).toHaveBeenCalledWith(updateProduct({
  //     product: {
  //       id: mockProduct.id,
  //       changes: component.productForm.value
  //     }
  //   }));
  //   expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  // });

  // it('should dispatch addProduct if editingProduct is null', () => {
  //   component.editingProduct = null;
  //   component.productForm.setValue({
  //     title: 'New Product',
  //     price: '200',
  //     category: 'New Category',
  //     image: 'new.jpg'
  //   });

  //   component.onSubmit();

  //   expect(storeSpy.dispatch).toHaveBeenCalledWith(addProduct({
  //     product: component.productForm.value
  //   }));
  //   expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
  // });
});
