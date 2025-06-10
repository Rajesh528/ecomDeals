import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import * as ProductSelectors from '../../store/selectors/products/product.selectors';
import * as ProductActions from '../../store/actions/product.actions';
import { Product } from '../../store/models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-page',
  standalone: false,
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent implements OnInit {
  products$!: Observable<Product[]>;
  loading$!: Observable<boolean>;
  authError$!: Observable<string | null>;
  constructor(private store: Store, private router: Router) { }

  ngOnInit(): void {

    this.products$ = this.store.select(ProductSelectors.selectAllProducts);
    this.loading$ = this.store.select(ProductSelectors.selectProductsLoading);
    this.authError$ = this.store.select(ProductSelectors.selectProductsError);
    this.store.select(ProductSelectors.selectProductLoaded).pipe(take(1)).subscribe(loaded => {
      console.log(loaded);
      if (!loaded) {
        this.store.dispatch(ProductActions.loadProducts());
      }
    });
  }

  editProduct(product: Product) {
    this.router.navigate(['/product', product.id]);
  }
  addNewProduct() {
    this.router.navigate(['/product', 'new']);
  }

}
