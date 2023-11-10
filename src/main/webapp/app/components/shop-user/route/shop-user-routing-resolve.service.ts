import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IShopUser, ShopUser } from '../shop-user.model';
import { ShopUserService } from '../service/shop-user.service';

@Injectable({ providedIn: 'root' })
export class ShopUserRoutingResolveService implements Resolve<IShopUser> {
  constructor(protected service: ShopUserService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IShopUser> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((shopUser: HttpResponse<ShopUser>) => {
          if (shopUser.body) {
            return of(shopUser.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ShopUser());
  }
}
