import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as ProductActions from '../actions/product.actions';
import { catchError, exhaustMap, map, mergeMap, of } from 'rxjs';
import { Update } from '@ngrx/entity';
import { Product } from '../models/product.model';
import { ProductService } from '../../service/product.service';

@Injectable()
export class ProductEffects {
    private actions$ = inject(Actions)
    constructor(

        private productService: ProductService
    ) { }
    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.loadProducts),
            exhaustMap(() =>
                this.productService.getProducts().pipe(
                    map((products: Product[]) =>
                        ProductActions.loadProductsSuccess({ products })
                    ),
                    catchError(error =>
                        of(ProductActions.loadProductsFailure({ error: 'unable to load the products' }))
                    )
                )
            )
        )
    );


    addProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.addProduct),
            mergeMap(({ product }) =>
                this.productService.addProduct(product).pipe(
                    map((newProduct: Product) =>
                        ProductActions.addProductSuccess({ product: newProduct })
                    ),
                    catchError(error =>
                        of(ProductActions.addProductFailure({ error: error.message }))
                    )
                )
            )
        )
    );


    updateProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.updateProduct),
            mergeMap(({ product }) =>
                this.productService.updateProduct(product).pipe(
                    map((updated: Product) => {
                        const update: Update<Product> = {
                            id: updated.id,
                            changes: updated
                        };
                        return ProductActions.updateProductSuccess({ product: update });
                    }),
                    catchError(error =>
                        of(ProductActions.updateProductFailure({ error: error.message }))
                    )
                )
            )
        )
    );


    deleteProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ProductActions.deleteProduct),
            mergeMap(({ id }) =>
                this.productService.deleteProduct(id).pipe(
                    map(() => ProductActions.deleteProductSuccess({ id })),
                    catchError(error =>
                        of(ProductActions.deleteProductFailure({ error: error.message }))
                    )
                )
            )
        )
    );
}
