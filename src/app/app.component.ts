import { Component, OnInit } from '@angular/core';

import { ProductInterface } from './core/interfaces/product-interface';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  private _title = 'shop-list';

  public shopList: ProductInterface[] = [];

  public ngOnInit(): void {
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

  public get title(): string {
    return this._title;
  }

  public remove(product: ProductInterface): void {
    this.shopList.splice(
      this.shopList.indexOf(product),
      1
    );
  }
}
