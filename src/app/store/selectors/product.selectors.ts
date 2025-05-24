import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState, selectAll } from '../reducers/product.reducer';

// 1. Feature selector (root-level or lazy-loaded feature)
export const selectProductState = createFeatureSelector<ProductState>('productState');

// 2. Entity selectors
export const selectAllProducts = createSelector(
  selectProductState,
  selectAll
);

export const selectProductEntities = createSelector(
  selectProductState,
  state => state.entities
);

export const selectProductById = (id: number) => createSelector(
  selectProductEntities,
  entities => entities[id]
);

// 3. UI state selectors
export const selectProductsLoading = createSelector(
  selectProductState,
  (state) => state.loading
);

export const selectProductsError = createSelector(
  selectProductState,
  (state) => state.error
);
