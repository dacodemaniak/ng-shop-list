import { fakeBackendProvider } from './core/services/fake-backend.service';
import { LocalizationService } from './core/services/localization.service';
import { CoreModule } from './core/core.module';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/shared.module';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  TranslateLoader,
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';

import {
  HttpClient,
  HttpClientModule
} from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(
    httpClient,
    './assets/i18n/',
    '.json'
  );
}

export function localizationInitializerFactory(
  translateService: TranslateService,
  localizationService: LocalizationService,
  injector: Injector
): any {
  return (): Promise<void> => {
    return localizationService.init(translateService, injector);
  };
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [
          HttpClient
        ]
      }
    })
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: localizationInitializerFactory,
      deps: [
        TranslateService,
        LocalizationService,
        Injector
      ],
      multi: true
    },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
