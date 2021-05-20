import { ShopListService } from './../../core/services/shop-list.service';
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

  public editMode = false;

  constructor(
    private shopListService: ShopListService
  ) { }

  ngOnInit(): void {
    this.shopList = this.shopListService.toArray();
  }

  public list(): Map<number, ProductInterface> {
    return this.shopListService.list;
  }

  public add(): void {
    this.editMode = true;
  }

  public addToList(product: ProductInterface): void {
    this.shopList.push(product);
    this.editMode = false;
  }

  public remove(product: ProductInterface): void {
    this.shopList.splice(
      this.shopList.indexOf(product),
      1
    );
  }

  public changeSelection(product: ProductInterface): void {
    product.isSelected = !product.isSelected;

    if (
      this.shopList
        .filter((item: ProductInterface) => item.isSelected)
        .length !== this.shopList.length
    ) {
      this.allSelected = false;
    } else {
      this.allSelected = true;
    }
  }

}
