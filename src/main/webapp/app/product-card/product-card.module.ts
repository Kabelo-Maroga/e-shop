import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { PRODUCT_CARD_ROUTE } from './product-card.route';
import { ProductCardComponent } from './product-card.component';

@NgModule({
  imports: [SharedModule, RouterModule.forChild([PRODUCT_CARD_ROUTE])],
  declarations: [ProductCardComponent],
  exports: [ProductCardComponent],
})
export class ProductCardModule {}
