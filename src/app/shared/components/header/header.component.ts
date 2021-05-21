import { LocalizationService } from './../../../core/services/localization.service';
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
  public language: string;

  constructor(
    private shopListService: ShopListService,
    private localizationService: LocalizationService
  ) { }

  ngOnInit(): void {
    this.language = this.localizationService.language;
    this.shopListService.shopListNumber
      .subscribe((nbProduct) => {this.shopListNumber = nbProduct; });
  }

  public switchLanguage(): void {
    this.localizationService.language = this.language;
  }
}
