import { ProductInterface } from './../interfaces/product-interface';
import { ShopListService } from './shop-list.service';
import { Observable, of } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';

@Injectable()
class FakeBackendService implements HttpInterceptor {

  constructor(private shopListService: ShopListService) { }

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;

    console.log(`Request ${url} was intercepted`);

    const service: ShopListService = this.shopListService;

    return of(null)
      .pipe(
        mergeMap(handleRoute),
        materialize(),
        delay(500),
        dematerialize()
      );



    // Function that handle the request
    function handleRoute(): Observable<HttpEvent<any>> {
      const productRegex: RegExp = /\api\/v1\/product+$/;

      switch (true) {
        case productRegex.test(url) && method === 'GET':
            return findAll();
        case productRegex.test(url) && method === 'POST':
          return add();
        default:
          return next.handle(request);
      }
    }

    function findAll(): Observable<HttpResponse<any>> {
      return of(new HttpResponse({
          status: 200,
          body: service.list
        })
      );
    }

    function add(): Observable<HttpResponse<any>> {
      const product: ProductInterface = service.add(body);
      return of(
        new HttpResponse({
          status: 201,
          body: product
        })
      );
    }
  }
}

export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendService,
  multi: true
};
