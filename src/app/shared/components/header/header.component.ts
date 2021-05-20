import { BehaviorSubject } from 'rxjs';
import { ShopListService } from './../../../core/services/shop-list.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() public title: string;

  public shopListNumber: number;

  constructor(
    private shopListService: ShopListService
  ) { }

  ngOnInit(): void {
    this.shopListService.shopListNumber
      .subscribe((nbProduct) => {this.shopListNumber = nbProduct; });
  }

}
