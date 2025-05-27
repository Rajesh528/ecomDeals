import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as ProductSelectors from '../../store/selectors/product.selectors';
import * as ProductActions from '../../store/actions/product.actions';
import { Product } from '../../store/models/product.model';

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
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(ProductActions.loadProducts());
    this.products$ = this.store.select(ProductSelectors.selectAllProducts);
    this.loading$ = this.store.select(ProductSelectors.selectProductsLoading);
      this.authError$ =  this.store.select(ProductSelectors.selectProductsError);
  }
}
