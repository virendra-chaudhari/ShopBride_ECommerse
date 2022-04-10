import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProduct } from './add-product.component';

describe('SidebarComponent', () => {
  let component: AddProduct;
  let fixture: ComponentFixture<AddProduct>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProduct ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProduct);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
