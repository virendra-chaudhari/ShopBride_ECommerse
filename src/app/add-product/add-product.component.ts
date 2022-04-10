import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Product } from '../Model/product';

@Component({
  selector: 'app-addProduct',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProduct implements OnInit {

  addProductForm!:FormGroup;
  isFormUpdated:boolean =  false;
  @Input() productUpdateDataObservable!:Subject<Product>
  @Output() addProductEmitter:EventEmitter<Product> =  new EventEmitter<Product>();
  @Output() updateProductEmitter:EventEmitter<Product> =  new EventEmitter<Product>();

  constructor(private fb:FormBuilder) { 
    
  }

  ngOnInit(): void {
    this.productUpdateDataObservable.subscribe(product => {
      if(product){
        this.isFormUpdated =  true;
        this.addProductForm.patchValue(product)
      }
    })
    this.addProductForm = this.fb.group({
      id:[],
      title:['', Validators.compose([Validators.required,
        Validators.pattern("^(?=.*[A-Za-z])([a-zA-Z0-9!@#',\\$%\\'\\&*\)\( _-]+)$")])],
      price:['', Validators.compose([Validators.required])],    
      description:['', Validators.compose([Validators.required])],
      category:[null, Validators.compose([Validators.required])],
      image:["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80"],
    })
  }

  get t(){
    return this.addProductForm.controls;
  };

  addProduct(){
    this.addProductEmitter.emit(this.addProductForm.value);
    this.addProductForm.reset();
  };

  updateProducts(){
    this.updateProductEmitter.emit(this.addProductForm.value);
    this.isFormUpdated = false;
    this.addProductForm.reset();
  }
}
