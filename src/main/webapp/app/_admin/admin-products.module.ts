import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { ADMIN_PRODUCTS_ROUTE } from './admin-products.route';
import { AdminProductsComponent } from './admin-products.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([ADMIN_PRODUCTS_ROUTE])],
  declarations: [AdminProductsComponent],
})
export class AdminProductsModule {}
