import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Category } from '../site-layout/category';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  search = new BehaviorSubject<string>(''); //to move data between components in the search operation
  viewStatus = new BehaviorSubject<boolean>(true); //to move data between components on page view change
  delete = new Subject<boolean>();
  constructor(private httpClient: HttpClient) {}

  //Observable method created to add product
  createProduct(productBody): Observable<Product> {
    const baseUrl = 'http://localhost:3000/products';
    return this.httpClient.post<Product>(baseUrl, productBody);
  }
  //Observable method created to show a product details
  viewProduct(productId): Observable<Product> {
    const baseUrl = 'http://localhost:3000/products/' + productId;
    return this.httpClient.get<Product>(baseUrl);
  }
  //Observable method created to show all product
  viewAllProduct(): Observable<Product> {
    const baseUrl = 'http://localhost:3000/products/';
    return this.httpClient.get<Product>(baseUrl);
  }
  //Observable method created to update product
  updateProduct(productID, productBody): Observable<Product> {
    const baseUrl = 'http://localhost:3000/products/' + productID;
    return this.httpClient.put<Product>(baseUrl, productBody);
  }
  //Observable method created to delete product
  deleteProduct(productID): Observable<Product> {
    const baseUrl = 'http://localhost:3000/products/' + productID;
    return this.httpClient.delete<Product>(baseUrl);
  }
  //Observable method created to show all product by category id
  searchCategoryProduct(categoryID): Observable<Product> {
    const baseUrl = 'http://localhost:3000/products?categoryId=' + categoryID;
    return this.httpClient.get<Product>(baseUrl);
  }
  //Observable method created to show category list
  getCategory() {
    const categoryUrl = 'http://localhost:3000/categories';
    return this.httpClient.get<Category>(categoryUrl);
  }
}
