import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ProductActions from '../actions/product.actions';
import { Product } from '../models/product.model';
import { logout } from '../actions/auth.actions';

// ─── Entity State ─────────────────────────────────────────────
export interface ProductState extends EntityState<Product> {
  loading: boolean;
  error: string | null;
  loaded: boolean;
}

// ─── Adapter ──────────────────────────────────────────────────
export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const initialState: ProductState = adapter.getInitialState({
  loading: false,
  error: null,
  loaded: false
});

// ─── Reducer ──────────────────────────────────────────────────
export const productReducer = createReducer(
  initialState,

  // Load products
  on(ProductActions.loadProducts, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(ProductActions.loadProductsSuccess, (state, { products }) =>
    adapter.setAll(products, { ...state, loading: false, loaded: true })
  ),
  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Add product
  on(ProductActions.addProductSuccess, (state, { product }) =>
    adapter.addOne(product, state)
  ),
  on(ProductActions.addProductFailure, (state, { error }) => ({
    ...state,
    error, loaded: false
  })),

  // Update product
  on(ProductActions.updateProduct, (state, { product }) => (
    adapter.updateOne(product, state)
  )),
  on(ProductActions.updateProductSuccess, (state, { product }) =>
    adapter.updateOne(product, state)
  ),
  on(ProductActions.updateProductFailure, (state, { error }) => ({
    ...state,
    error
  })),

  // Delete product
  on(ProductActions.deleteProductSuccess, (state, { id }) =>
    adapter.removeOne(id, state)
  ),
  on(ProductActions.deleteProductFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(logout, () => initialState)
);

// ─── Selectors ────────────────────────────────────────────────
export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
