import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { Product } from '../store/models/product.model';
import { addProduct, loadProducts, updateProduct } from '../store/actions/product.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { selectProductById } from '../store/selectors/product.selectors';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-products-form',
  standalone: false,
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  editingProduct: Product | null = null;
  product$!: Observable<Product | undefined>;
  private subscription!: Subscription;

  constructor(private fb: FormBuilder, private store: Store, private route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
     this.store.dispatch(loadProducts());
    const productIdRaw = this.route.snapshot.paramMap.get('id');
    if (productIdRaw !== null && !isNaN(Number(productIdRaw))) {
      const productId = JSON.parse(productIdRaw);
      this.product$ = this.store.select(selectProductById(productId));
     
    } else {
      console.log('No productId found');
    }
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      image: ['', Validators.required]
    });

    if (this.product$) {
      this.subscription = this.product$.subscribe(product => {
        if (product) {
          this.edit(product);
        }
      });
    }


  }

  edit(product: Product) {
    this.editingProduct = product;
    this.productForm.patchValue(product);
  }

  onSubmit() {
    const product = this.productForm.value;

    if (this.editingProduct) {
      console.log(this.editingProduct);
      this.store.dispatch(updateProduct({
        product: {
          id: this.editingProduct.id,
          changes: this.productForm.value
        }
      }));
    } else {
      this.store.dispatch(addProduct({ product }));
    }
    this.router.navigate(['/home']);
    this.productForm.reset();
    this.editingProduct = null;
  }
}
