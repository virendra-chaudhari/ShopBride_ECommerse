import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../Model/product';
import { productData } from '../product-data';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }
  public productData = productData;


  getProductList(limits: number, page: number): Observable<any> {
    let product = productData.slice((limits * page), (limits * (page + 1)));
    if (product.length) {
      return of({ product, size: this.productData.length })
    }
    return of(false)

  };

  addNewProduct(product: Product): Observable<Product> {
    this.productData.unshift(product)
    return of(product)
  }

  deleteProduct(id: any): Observable<boolean> {
    let productIndex = this.productData.findIndex(product => product.id == id)
    if (productIndex >= 0) {
      this.productData.splice(productIndex, 1)
      return of(true)
    }
    else {
      return of(true)
    }

  }

  updateProduct(product: Product): Observable<boolean> {
    let findIndex = this.productData.findIndex(pro => pro.id == product.id);
    if (findIndex >= 0) {
      this.productData[findIndex] = product
      return of(true)
    }
    return of(false)

  }

  searchProduct(searchText: string): Observable<Product[]> {
    let products = [...this.productData];
    if (searchText.length) {
      let searchProduct = products.filter((item) => {
        return item.title.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
      });
      return of(searchProduct)
    }
    else {
      return of([])
    }
  }
}
