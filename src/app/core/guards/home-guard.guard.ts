import { ShopListService } from './../services/shop-list.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeGuardGuard implements CanActivate {
  public constructor(
    private shopListService: ShopListService,
    private router: Router
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.shopListService.shopListNumber.getValue() === 0) {
        this.router.navigate(['add']);
        return false;
      }
      return true;
  }
}
