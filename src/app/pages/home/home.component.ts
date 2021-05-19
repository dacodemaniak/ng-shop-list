import { Component, OnInit } from '@angular/core';
import { ProductInterface } from './../../core/interfaces/product-interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public shopList: ProductInterface[] = [];

  public allSelected = false;
  public isSelected = false;

  constructor() { }

  ngOnInit(): void {
    this.shopList.push(
      {
        name: 'Pommes de terre',
        quantity: 1,
        unit: 'Kg'
      }
    );
    this.shopList.push(
      {
        name: 'Oranges',
        quantity: 1,
        unit: 'Kg'
      }
    );

    console.log(this.shopList.length + ' éléments dans la liste');
  }

  public remove(product: ProductInterface): void {
    this.shopList.splice(
      this.shopList.indexOf(product),
      1
    );
  }

  public decrement(product: ProductInterface): void {
    product.quantity--;
    if (product.quantity === 0) {
      this.remove(product);
    }
  }

  public increment(product: ProductInterface): void {
    product.quantity++;
  }

}
