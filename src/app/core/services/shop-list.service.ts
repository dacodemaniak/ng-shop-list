import { ProductInterface } from './../interfaces/product-interface';
import { Injectable } from '@angular/core';
import { ListInterface } from '../interfaces/list-interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopListService implements ListInterface<ProductInterface> {

  private shopList: Map<number, ProductInterface> = new Map();
  private shopListNumber$: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() {
    console.log('Hi, je suis le constructeur de ShopListService');
    this.populate();
  }

  public toArray(): ProductInterface[] {
    return Array.from(this.shopList.values());
  }

  public get list(): Map<number, ProductInterface> {
    return this.shopList;
  }

  public get shopListNumber(): BehaviorSubject<number> {
    return this.shopListNumber$;
  }

  public add(product: ProductInterface): ProductInterface {
    const products: ProductInterface[] = [];
    this.shopList.forEach((element: ProductInterface, key: number) => {
      products.push(element);
    });
    products.sort((a: ProductInterface, b: ProductInterface) => b.id - a.id);

    // product.id = [...this.shopList.keys()].sort((a: number, b: number) => a - b)[0] + 1;

    product.id = products[0].id + 1;

    this.shopList.set(product.id, product);

    this.shopListNumber$.next(this.shopList.size);

    return this.shopList.get(product.id);
  }

  public remove(product: ProductInterface): void {}
  public update(product: ProductInterface): void {}

  private populate(): void {
    this.shopList.set(
      1,
      {
        id: 1,
        name: 'Pommes de terre',
        quantity: 1,
        unit: 'Kg'
      }
    )
    .set(
      2,
      {
        id: 2,
        name: 'Oranges',
        quantity: 1,
        unit: 'Kg'
      }
    );
    this.shopListNumber$.next(this.shopList.size);
  }

}

