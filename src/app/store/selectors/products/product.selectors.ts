import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState, selectAll } from '../../reducers/products/product.reducer';

export const selectProductState = createFeatureSelector<ProductState>('productState');

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
export const selectProductsLoading = createSelector(
  selectProductState,
  (state) => state.loading
);

export const selectProductsError = createSelector(
  selectProductState,
  (state) => state.error
);
export const selectProductLoaded = createSelector(
  selectProductState,
  (state) => state.loaded
);
