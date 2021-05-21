import { ProductModel } from './../models/product-model';
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
/*     const products: ProductInterface[] = [];
    this.shopList.forEach((element: ProductInterface, key: number) => {
      products.push(element);
    });
    products.sort((a: ProductInterface, b: ProductInterface) => b.id - a.id); */

    product.id = this.shopList.size ? [...this.shopList.keys()].sort((a: number, b: number) => b - a)[0] + 1 : 1;

    if (this.shopList.size) {
      const products: number[] = [...this.shopList.keys()];
      const orderedProducts: number[] = products.sort((n1: number, n2: number) => n1 - n2);
      product.id = orderedProducts[orderedProducts.length - 1] + 1;
    } else {
      product.id = 1;
    }
    // product.id = products[0].id + 1;

    this.shopList.set(product.id, product);

    this.shopListNumber$.next(this.shopList.size);

    localStorage.setItem(
      'product-list',
      JSON.stringify([... this.shopList.values()])
    );

    return this.shopList.get(product.id);
  }

  public remove(product: ProductInterface): void {
    this.shopList.delete(product.id);
    localStorage.setItem(
      'product-list',
      JSON.stringify([... this.shopList.values()])
    );
    this.shopListNumber$.next(this.shopList.size);
  }

  public update(product: ProductInterface): void {
    this.shopList.set(product.id, product);
    localStorage.setItem(
      'product-list',
      JSON.stringify([... this.shopList.values()])
    );
  }

  private populate(): void {
    const rawStorage = localStorage.getItem('product-list');
    if (rawStorage) {
      const rawProducts = JSON.parse(rawStorage);
      rawProducts.map((item: any) => {
        const product: ProductModel = new ProductModel().deserialize(item);
        this.shopList.set(product.id, product);
      });
    }
    this.shopListNumber$.next(this.shopList.size);
  }

}

