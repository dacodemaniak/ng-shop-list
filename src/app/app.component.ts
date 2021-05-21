import { TranslateService } from '@ngx-translate/core';
import { ShopListService } from './core/services/shop-list.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  private _title = 'shop-list';

  public constructor(
    private shopListService: ShopListService,
    private translateService: TranslateService
  ) {}

  public ngOnInit(): void {

  }

  public get title(): string {
    return this.translateService.instant('title');
  }


}
