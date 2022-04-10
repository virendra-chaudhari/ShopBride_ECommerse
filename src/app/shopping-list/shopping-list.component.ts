import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs';
import { Product } from '../Model/product';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit {

  @Input() productList: Product[] = [];
  @Input() productSize!: number;
  @Output() pageNumberEmitter: EventEmitter<number> = new EventEmitter<number>();
  @Output() deleteProductEmitter: EventEmitter<string> = new EventEmitter<string>();
  @Output() updateProductEmitter: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() searchProductEmitter: EventEmitter<{size:number,product:Product[]}> = new EventEmitter<{size:number,product:Product[]}>();

  page: number = 1;
  pageSize: number = 3;
  searchProduct = new FormControl();
  constructor(private productService: ProductService) { }
  ngOnInit(): void {
    this.searchProduct.valueChanges
      .pipe(
        debounceTime(500),
        switchMap(text => this.productService.searchProduct(text))
      )
      .subscribe(products => {
        this.searchProductEmitter.emit({size:products.length,product:products})
      })
  }

  getNextPageProduct() {
    console.log(this.page)
    this.pageNumberEmitter.emit((this.page - 1))
  };

  deleteProduct(productId: string) {
    this.deleteProductEmitter.emit(productId)
  };

  updateProduct(product: Product) {
    this.updateProductEmitter.emit(product)
  }

}
