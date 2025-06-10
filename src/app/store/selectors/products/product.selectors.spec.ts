import * as ProductSelectors from './product.selectors';
import { ProductState } from '../../reducers/products/product.reducer';
import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Product } from '../../models/product.model';

describe('Product Selectors', () => {
  const adapter = createEntityAdapter<Product>();

  const product1: Product = { id: 1, title: 'Phone', price: 1000, description:'description', category:'test', image:"url"};
  const product2: Product = { id: 2, title: 'Laptop', price: 2000,description:'description', category:'test', image:"url" };

  const initialState: ProductState = adapter.setAll(
    [product1, product2],
    {
      ids: [1, 2],
      entities: {
        1: product1,
        2: product2
      },
      loading: false,
      loaded: true,
      error: null
    }
  );

  it('should select all products', () => {
    const result = ProductSelectors.selectAllProducts.projector(initialState);
    expect(result.length).toBe(2);
    expect(result).toContain(product1);
    expect(result).toContain(product2);
  });

  it('should select product entities', () => {
    const result = ProductSelectors.selectProductEntities.projector(initialState);
    expect(result[1]).toEqual(product1);
    expect(result[2]).toEqual(product2);
  });

  it('should select product by id', () => {
    const selector = ProductSelectors.selectProductById(1);
    const result = selector.projector(initialState.entities);
    expect(result).toEqual(product1);
  });

  it('should select loading', () => {
    const result = ProductSelectors.selectProductsLoading.projector(initialState);
    expect(result).toBe(false);
  });

  it('should select loaded', () => {
    const result = ProductSelectors.selectProductLoaded.projector(initialState);
    expect(result).toBe(true);
  });

  it('should select error', () => {
    const result = ProductSelectors.selectProductsError.projector(initialState);
    expect(result).toBe(null);
  });
});
