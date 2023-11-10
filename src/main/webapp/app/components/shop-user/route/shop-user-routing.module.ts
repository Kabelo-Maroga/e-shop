import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ShopUserComponent } from '../list/shop-user.component';
import { ShopUserDetailComponent } from '../detail/shop-user-detail.component';
import { ShopUserUpdateComponent } from '../update/shop-user-update.component';
import { ShopUserRoutingResolveService } from './shop-user-routing-resolve.service';

const shopUserRoute: Routes = [
  {
    path: '',
    component: ShopUserComponent,
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ShopUserDetailComponent,
    resolve: {
      shopUser: ShopUserRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ShopUserUpdateComponent,
    resolve: {
      shopUser: ShopUserRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ShopUserUpdateComponent,
    resolve: {
      shopUser: ShopUserRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(shopUserRoute)],
  exports: [RouterModule],
})
export class ShopUserRoutingModule {}
