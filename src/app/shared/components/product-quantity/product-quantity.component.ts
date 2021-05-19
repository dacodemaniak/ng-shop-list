import { ProductInterface } from './../../../core/interfaces/product-interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})
export class ProductQuantityComponent implements OnInit {
  @Input() public product: ProductInterface;
  @Output() public removeProduct: EventEmitter<ProductInterface> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public decrement(): void {
    this.product.quantity--;
    if (this.product.quantity === 0) {
      this.removeProduct.emit(this.product);
    }
  }

  public increment(): void {
    this.product.quantity++;
  }

}
