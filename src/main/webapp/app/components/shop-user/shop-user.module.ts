import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { ShopUserComponent } from './list/shop-user.component';
import { ShopUserDetailComponent } from './detail/shop-user-detail.component';
import { ShopUserUpdateComponent } from './update/shop-user-update.component';
import { ShopUserDeleteDialogComponent } from './delete/shop-user-delete-dialog.component';
import { ShopUserRoutingModule } from './route/shop-user-routing.module';

@NgModule({
  imports: [SharedModule, ShopUserRoutingModule],
  declarations: [ShopUserComponent, ShopUserDetailComponent, ShopUserUpdateComponent, ShopUserDeleteDialogComponent],
  entryComponents: [ShopUserDeleteDialogComponent],
})
export class ShopUserModule {}
