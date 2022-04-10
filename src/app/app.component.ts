import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Product } from './Model/product';
import { ProductService } from './service/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shopBridge App';
  productList: Product[] = [];
  pageNo: number = 0;
  pageSize: number = 3;
  productSize: number = 10;
  productUpdateDataObservable: Subject<Product> = new Subject<Product>();
  constructor(public productService: ProductService, public toastr: ToastrService) { }
  ngOnInit() {
    this.getProductList();
  }

  getProductList() {
    this.productService.getProductList(this.pageSize, this.pageNo).subscribe({
      next: products => {
        if (products) {
          this.productList = products.product;
          this.productSize = products.size;
        } else {
          this.toastr.error('Something went wrong!')
        }
      },
      error: error => {
        this.toastr.error('Something went wrong!')
      }
    })
  }

  addProduct(product: Product) {
    product.id = product.title + this.productSize
    this.productService.addNewProduct(product).subscribe({
      next:data => {
        if (data) {
          this.toastr.success('Product added successfully!')
          this.getProductList();
        }
        else {
          this.toastr.error('Something went wrong!')
        }
      },
      error: (error) => {
        this.toastr.error('Something went wrong!')
      }
    })
  }

  deleteProductFromList(productId: any) {
    this.productService.deleteProduct(productId).subscribe({
      next: result => {
        if (result) {
          this.toastr.success('Product deleted successfully!')
          this.getProductList()
        } else {
          this.toastr.error('Something went wrong!')
        }
      },
      error: error => {
        this.toastr.error('Something went wrong!')
      }
    })
  }

  updateProductDetails(product: Product) {
    this.productUpdateDataObservable.next(product)
  }

  updateProductData(product: Product) {
    this.productService.updateProduct(product).subscribe({
      next: (result) => {
        if (result) {
          this.toastr.success('Product updated successfully!')
          this.getProductList()
        } else {
          this.toastr.error('Something went wrong!')
        }
      },
      error: (error) => {
        this.toastr.error('Something went wrong!')
      }
    })
  };

  searchProduct(product:{size:number,product:Product[]}){
    if(product.product.length){
    this.productList = product.product;
    this.productSize = product.size;
    }
    else{
      this.getProductList()
    }
  }
}
