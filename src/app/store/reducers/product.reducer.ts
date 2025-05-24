import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as ProductActions from '../actions/product.actions';
import { Product } from '../models/product.model';

// ─── Entity State ─────────────────────────────────────────────
export interface ProductState extends EntityState<Product> {
  loading: boolean;
  error: string | null;
}

// ─── Adapter ──────────────────────────────────────────────────
export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const initialState: ProductState = adapter.getInitialState({
  loading: false,
  error: null
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
    adapter.setAll(products, { ...state, loading: false })
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
    error
  })),

  // Update product
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
  }))
);

// ─── Selectors ────────────────────────────────────────────────
export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
