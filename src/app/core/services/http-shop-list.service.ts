import { ProductInterface } from './../interfaces/product-interface';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from './../../../environments/environment';
import { catchError, map, take } from 'rxjs/operators';
import { ProductModel } from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class HttpShopListService {

  constructor(private httpClient: HttpClient) { }

  public all(): Observable<ProductInterface[]> {
    return this.httpClient
      .get(
        `${environment.api}product`
      )
      .pipe(
        take(1),
        map((results: any) => {
          const products: ProductInterface[] = [];
          if (results.size === 1) {
            throwError('Something went wrong');
          } else {
            results.forEach((value: any, key: number) => {
              products.push(new ProductModel().deserialize(value));
            });
            return products;
          }
        }),
      );
  }

  public add(product: ProductInterface): Observable<HttpResponse<any>> {
    return this.httpClient.post(
      `${environment.api}product`,
      product,
      {
        observe: 'response'
      }
    );
  }
}
