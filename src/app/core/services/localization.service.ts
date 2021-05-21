import { Observable } from 'rxjs';
import { LOCATION_INITIALIZED } from '@angular/common';
import { Injectable, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {

  private _language: string;
  private _translateService: TranslateService;

  constructor() { }

  public get language(): string {
    return this._language;
  }

  public set language(language: string) {
    this._language = language;
    this._switchLanguage();
  }

  public init(translateService: TranslateService, injector: Injector): Promise<void> {
    return new Promise((resolve) => {
      injector.get(
        LOCATION_INITIALIZED,
        Promise.resolve(null)
      ).then(() => {
        const userLanguage: string = window.navigator.language.split('-')[0];
        this._language = /(fr|en)/gi.test(userLanguage) ? userLanguage : 'fr';

        this._translateService = translateService;

        this._switchLanguage()
          .pipe(
            take(1)
          )
          .subscribe(() => {
            resolve(null);
            console.log(`Localization loaded in ${this._language} language`);
          });
      });
    });
  }

  private _switchLanguage(): Observable<any> {
    return this._translateService.use(this._language);
  }
}
