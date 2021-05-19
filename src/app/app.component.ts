import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // tslint:disable-next-line:variable-name
  private _title = 'shop-list';

  public ngOnInit(): void {

  }

  public get title(): string {
    return this._title;
  }


}
