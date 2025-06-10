import { productReducer, initialState, ProductState } from './product.reducer';
import * as ProductActions from '../../actions/product.actions';
import { Product } from '../../models/product.model';
import { logout } from '../../actions/auth.actions';
import { Update } from '@ngrx/entity';

describe('Product Reducer', () => {
  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    price: 100,
    category: 'Test Category',
    image: 'test.jpg',
    description:"description"
  };

  const updatedProduct: Update<Product> = {
    id: 1,
    changes: {
      title: 'Updated Product',
      price: 200
    }
  };

  it('should return the initial state by default', () => {
    const state = productReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  it('should handle loadProducts', () => {
    const state = productReducer(initialState, ProductActions.loadProducts());
    expect(state.loading).toBeTrue();
    expect(state.error).toBeNull();
    expect(state.loaded).toBeTrue();
  });

  it('should handle loadProductsSuccess', () => {
    const state = productReducer(initialState, ProductActions.loadProductsSuccess({ products: [mockProduct] }));
    expect(state.entities[1]).toEqual(mockProduct);
    expect(state.loading).toBeFalse();
    expect(state.loaded).toBeTrue();
  });

  it('should handle loadProductsFailure', () => {
    const error = 'Failed to load products';
    const state = productReducer(initialState, ProductActions.loadProductsFailure({ error }));
    expect(state.loading).toBeFalse();
    expect(state.error).toBe(error);
  });

  it('should handle addProductSuccess', () => {
    const state = productReducer(initialState, ProductActions.addProductSuccess({ product: mockProduct }));
    expect(state.entities[1]).toEqual(mockProduct);
  });

  it('should handle addProductFailure', () => {
    const error = 'Failed to add product';
    const state = productReducer(initialState, ProductActions.addProductFailure({ error }));
    expect(state.error).toBe(error);
    expect(state.loaded).toBeFalse();
  });

  it('should handle updateProduct', () => {
    const loadedState = {
      ...initialState,
      entities: { 1: mockProduct },
      ids: [1]
    };
    const state = productReducer(loadedState, ProductActions.updateProduct({ product: updatedProduct }));
    expect(state.entities[1]?.title).toBe('Updated Product');
    expect(state.entities[1]?.price).toBe(200);
  });

  it('should handle updateProductSuccess', () => {
    const loadedState = {
      ...initialState,
      entities: { 1: mockProduct },
      ids: [1]
    };
    const state = productReducer(loadedState, ProductActions.updateProductSuccess({ product: updatedProduct }));
    expect(state.entities[1]?.title).toBe('Updated Product');
    expect(state.loaded).toBeTrue();
  });

  it('should handle updateProductFailure', () => {
    const error = 'Update failed';
    const state = productReducer(initialState, ProductActions.updateProductFailure({ error }));
    expect(state.error).toBe(error);
  });

  it('should handle deleteProductSuccess', () => {
    const stateWithProduct = {
      ...initialState,
      entities: { 1: mockProduct },
      ids: [1]
    };
    const state = productReducer(stateWithProduct, ProductActions.deleteProductSuccess({ id: 1 }));
    expect(state.entities[1]).toBeUndefined();
  });

  it('should handle deleteProductFailure', () => {
    const error = 'Delete failed';
    const state = productReducer(initialState, ProductActions.deleteProductFailure({ error }));
    expect(state.error).toBe(error);
  });

  it('should reset to initial state on logout', () => {
    const stateWithProduct = {
      ...initialState,
      entities: { 1: mockProduct },
      ids: [1],
      loaded: true
    };
    const state = productReducer(stateWithProduct, logout());
    expect(state).toEqual(initialState);
  });
});
