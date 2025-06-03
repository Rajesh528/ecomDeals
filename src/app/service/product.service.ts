import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { Product } from '../store/models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
private baseUrl = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) {}

  // Get all products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  // Add a new product
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  // Update an existing product
  updateProduct(product: any): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${product.id}`, product);
  }

  // Delete a product
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
