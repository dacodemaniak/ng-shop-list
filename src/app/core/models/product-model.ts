import { ModelInterface } from '../interfaces/model-interface';
import { ProductInterface } from './../interfaces/product-interface';

export class ProductModel implements ProductInterface, ModelInterface<ProductModel> {
  public id: number;
  public name: string;
  public quantity: number;
  public unit: string;
  public isSelected: boolean;

  public constructor() {
    this.id = 0;
    this.name = '';
    this.quantity = 1;
    this.unit = '';
    this.isSelected = false;
  }

  public deserialize(datas: any): ProductModel {
    // Object.assign(this, datas);
    for (const data in datas) {
      if (this.hasOwnProperty(data)) {
        this[data] = datas[data];
      }
    }

    return this;
  }
}
